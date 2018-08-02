import React from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
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

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

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

    return (
      <div>
        Kirjautunut käyttäjä on <b>{this.state.user.name}  </b>
        <button type="button" onClick={this.logout}>kirjaudu ulos</button>
        <h2>Blogit</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
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
          <Notification message={this.state.infomessage} type='info'/>
        </div>
      </div>
    );
  }
}

export default App;
