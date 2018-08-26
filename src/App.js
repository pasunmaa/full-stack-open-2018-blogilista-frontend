import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { showNotification } from './reducers/notificationReducer'
import { userInitialization, userBlogAdd, userBlogRemove } from './reducers/userReducer'

import Login from './components/Login'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import UserList from './components/UserList'
import User from './components/User'
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

    this.blogInitialization()

    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  blogInitialization = () => {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    ).catch(error => {
      console.log(`initializing blogs failed ${error}`)
      this.props.showNotification(`yhteys palvelimeen epäonnistui. Yritä myöhemmin uudestaan: ${error}`, 7, 'error')
    })
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
      const userId = newBlog.user._id
      //console.log(userId, newBlog)
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        title: '', author: '', url: '' })
      //delete newBlog.user // property is not needed by userBlogAdd
      this.props.userBlogAdd(userId, newBlog)
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
          this.props.showNotification(`Poistettiin blogi: ${this.state.blogs[iBlog].title}`, 5)
          this.props.userBlogRemove(this.state.blogs[iBlog].user._id, blogID)
          this.setState({ blogs: this.state.blogs.filter((blog, i) => i !== iBlog) })
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
            <Navi name={this.state.user.name} logout={this.logout}/>
            <Switch>
              <Route
                exact path="/"
                render={({ history }) =>
                  <div>
                    <div>
                      <BlogList
                        history={ history }
                        blogs={this.state.blogs} />
                    </div>
                    <div>
                      <br></br>
                      <Togglable buttonLabel="Lisää blogi" innerRef={component => this.blogForm = component}>
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
                }
              />
              <Route
                path={'/blogs/:id'}
                render={({ match, history }) => {
                  return (
                    <Blog className="bloglong"
                      blog={this.state.blogs.find(b => b.id === match.params.id)}
                      likeIncrease={this.updateBlog(match.params.id)}
                      currentUser={this.state.user.username}
                      deleteBlog={this.deleteBlog(match.params.id)}
                      history={ history } />
                  )}
                } />
              <Route
                exact path="/users"
                render={({ history }) => <UserList history={ history } />} />
              <Route
                path={`/users/:${this.props.selecteduserid}`}
                render={({ history }) =>
                  <User
                    id={this.props.selecteduserid}
                    history={ history } />} />
              <Redirect from="/*" to="/" />
            </Switch>
          </div>
        </Router>
        <Notification />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    selecteduserid: state.userdata.selecteduserid,
    users: state.userdata.users
  }
}

export default connect(
  mapStateToProps,
  { showNotification, userInitialization, userBlogAdd, userBlogRemove }
)(App)