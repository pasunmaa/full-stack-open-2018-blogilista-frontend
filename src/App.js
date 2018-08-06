import React from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import TogglableLine from './components/TogglableLine'
import blogService from './services/blogs'
import loginService from './services/login'

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
      error: '',
      infomessage: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
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
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    console.log('logging out', this.state.user.name)
    window.localStorage.removeItem('loggedAppUser')
    blogService.setToken(null)
    this.setState({ 
      user: null,
      infomessage: `Käyttäjä kirjautunut ulos.`})
        setTimeout(() => {
          this.setState({ infomessage: null })
        }, 3000)
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
        title: '', author: '', url: '',
        infomessage: `Lisättiin uusi blogi: ${newBlog.title}`})
      this.blogForm.toggleVisibility()
        setTimeout(() => {
        this.setState({ infomessage: null })
      }, 5000)
    } catch(exception) {
      console.log('creating new blog', this.state.title,' failed with ', exception)
      this.setState({
        error: 'blogin luonti epäonnistui' + exception,
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
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
          infomessage: `Päivitettiin blogia: ${aBlog.title}`})
        setTimeout(() => {
          this.setState({ infomessage: null })
        }, 5000)
      } catch(exception) {
        console.log('updating blog',this.state.blogs[iBlog].titlee,' failed with ', exception)
        this.setState({
          error: 'blogin päivitys epäonnistui' + exception,
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
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
          this.setState({ 
            infomessage: `Poistettiin blogi: ${this.state.blogs[iBlog].title}`,
            blogs: this.state.blogs.filter((blog, i) => i !== iBlog)})
          setTimeout(() => {
            this.setState({ infomessage: null })
          }, 5000)
        } catch(exception) {
          console.log('deleting blog', this.state.blogs[iBlog].title,' failed with ', exception)
          this.setState({
            error: 'blogin poisto epäonnistui' + exception,
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000)
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
        <Notification message={this.state.infomessage} /* type='stadard' */ />
        <Login 
          username={this.state.username} 
          password={this.state.password}
          login={this.login}
          onChange={this.handleFieldChange}
          message={this.state.error}/>
        </div>
      )
    }

    const blogsSortedByLikes = this.state.blogs.sort((x, y) => y.likes - x.likes)

    return (
      <div>
        Kirjautunut käyttäjä on <b>{this.state.user.name}  </b>
        <button type="button" onClick={this.logout}>kirjaudu ulos</button>
        <h2>Blogit</h2>
        {blogsSortedByLikes.map(blog => {
          return ( 
            <TogglableLine 
              key={'line'+blog.id} 
              linetext={blog.title} 
              ref={component => this.blogList[blog.id] = component}
              showactionbutton={blog.user ? this.state.user.username === blog.user.username : true}
              actionlable={'Poista'}
              actionbutton={this.deleteBlog(blog.id)}>
                <Blog key={'blog'+blog.id} blog={blog} likeIncrease={this.updateBlog(blog.id)}/>
            </TogglableLine>
          )}
        )}
        <Notification message={this.state.error} type='error'/>
        <br></br>
        <div>
          <Togglable buttonLabel="Lisää blogi" ref={component => this.blogForm = component}>
            <BlogForm 
              onSubmit={this.createNew}
              onChange={this.handleFieldChange}
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}
              message={this.state.error} />
          </Togglable>
          <br></br>
          <Notification message={this.state.infomessage} type='info'/>
        </div>
      </div>
    );
  }
}

export default App;
