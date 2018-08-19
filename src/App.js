import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { showNotification } from './reducers/notificationReducer'
import { userInitialization } from './reducers/userReducer'

import Login from './components/Login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import TogglableLine from './components/TogglableLine'
import blogService from './services/blogs'
import loginService from './services/login'
import UserList from './components/UserList'
import Navi from './components/Navi'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
    }
  }

  componentDidMount() {
    this.props.userInitialization()

    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    console.log('logging in with', this.state.username) //, this.state.password)
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      //console.log(user.token)
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch(exception) {
      this.props.showNotification(`käyttäjätunnus tai salasana virheellinen: ${exception}`, 5, 'error')
    }
  }

  logout = async (event) => {
    event.preventDefault()
    console.log('logging out', this.state.user.name)
    window.localStorage.removeItem('loggedAppUser')
    blogService.setToken(null)
    this.setState({ user: null })
    this.props.showNotification('Käyttäjä kirjautunut ulos.', 3)
  }

  createNew = async (event) => {
    event.preventDefault()
    //console.log('creating new blog', this.state.title)
    try{
      const newBlog = await blogService.createNew({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      //console.log(newBlog)
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        title: '', author: '', url: '' })
      this.blogForm.toggleVisibility()
      this.props.showNotification(`Lisättiin uusi blogi: ${newBlog.title}`, 5)
    } catch(exception) {
      console.log('creating new blog failed with ', exception)
      this.props.showNotification(`blogin luonti epäonnistui: ${exception}`, 5, 'error')
    }
  }

  updateBlog = (blogID) => {
    return async () => {
      //console.log('udpating blog id', blogID)
      const iBlog = this.state.blogs.findIndex(blog => blog.id === blogID)
      const user = { ...this.state.blogs[iBlog].user }
      const blogToBeUpdated = {
        id: blogID,
        title: this.state.blogs[iBlog].title,
        author: this.state.blogs[iBlog].author,
        url: this.state.blogs[iBlog].url,
        user: user,
        likes: this.state.blogs[iBlog].likes + 1,
      }
      try{
        const aBlog = await blogService.updateBlog(this.state.blogs[iBlog].id, blogToBeUpdated)
        this.setState({
          blogs: this.state.blogs.map((blog, i) => i === iBlog ? blogToBeUpdated : blog),
        })
        this.props.showNotification(`Päivitettiin blogia: ${aBlog.title}`, 5)
      } catch(exception) {
        console.log('updating blog failed with ', exception)
        this.props.showNotification(`blogin päivitys epäonnistui: ${exception}`, 5, 'error')
      }
    }
  }

  deleteBlog = (blogID) => {
    return async () => {
      const iBlog = this.state.blogs.findIndex(blog => blog.id === blogID)
      //console.log('deleting blog', blogID, this.state.blogs[iBlog].title)
      if (window.confirm('Haluatko varmasti poistaa blogin ', this.state.blogs[iBlog].title)) {
        try{
          await blogService.deleteBlog(this.state.blogs[iBlog].id)
          this.setState({ blogs: this.state.blogs.filter((blog, i) => i !== iBlog) })
          this.props.showNotification(`Poistettiin blogi: ${this.state.blogs[iBlog].title}`, 5)
        } catch(exception) {
          console.log('deleting blog failed with ', exception)
          this.props.showNotification(`blogin poisto epäonnistui: ${exception}`, 5, 'error')
        }
      }
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  blogList = {}  // references to children components

  render() {
    const blogsSortedByLikes = this.state.blogs.sort((x, y) => y.likes - x.likes)

    if (this.state.user === null) {
      return (
        <div>
          <h1>Blogisovellus</h1>
          <Login
            username={this.state.username}
            password={this.state.password}
            login={this.login}
            onChange={this.handleFieldChange} />
          <br></br>
          <Notification />
        </div>
      )
    }

    return (
      <div className='loggedInUserView'>
        <h1>Blogisovellus</h1>
        <Router>
          <div>
            <div>
              <Navi />
              <span>
                &nbsp;
                <b>{this.state.user.name}</b> kirjautuneena. &nbsp;
                <button type="button" onClick={this.logout}>kirjaudu ulos</button>
              </span>
            </div>
            <Route exact path="/" render={() =>
              <div>
                <div>
                  <h2>Blogit</h2>
                  {blogsSortedByLikes.map(blog => {
                    return (
                      <TogglableLine className="blogshort"
                        key={'line'+blog.id}
                        linetext={blog.title}
                        ref={component => this.blogList[blog.id] = component}
                        showactionbutton={blog.user ? this.state.user.username === blog.user.username : true}
                        actionlable={'Poista'}
                        actionbutton={this.deleteBlog(blog.id)}>
                        <Blog className="bloglong"
                          key={'blog'+blog.id}
                          blog={blog}
                          likeIncrease={this.updateBlog(blog.id)}/>
                      </TogglableLine>
                    )}
                  )}
                </div>
                <div>
                  <br></br>
                  <Togglable buttonLabel="Lisää blogi" ref={component => this.blogForm = component}>
                    <BlogForm
                      onSubmit={this.createNew}
                      onChange={this.handleFieldChange}
                      title={this.state.title}
                      author={this.state.author}
                      url={this.state.url} />
                  </Togglable>
                  <br></br>
                </div>
              </div>
            } />
            <Route path="/users" render={() => <UserList />} />
          </div>
        </Router>

        <Notification />
      </div>
    )
  }
}

export default connect(
  null,
  { showNotification, userInitialization }
)(App)