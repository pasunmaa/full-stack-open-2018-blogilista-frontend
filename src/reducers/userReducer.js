import userService from '../services/users'

const usersAtStart = [
  {
    _id: '5a437a9e514ab7f168ddf138',
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    blogs: [
      { author: 'Michael Chan',
        likes: 7,
        title: 'React patterns',
        url: 'https://reactpatterns.com/',
        _id: '5a422a851b54a676234d17f7' },
      {
        author: 'Robert C. Martin',
        likes: 8,
        title: 'TDD harms architecture',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        _id: '5a422ba71b54a676234d17fb'
      }
    ]
  },
  {
    _id: '1234567890',
    username: 'testaaja',
    name: 'Tauno Testaaja',
    blogs: [
      {
        author: 'Robert C. Martin',
        likes: 5,
        title: 'First class tests',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        _id: '11223344'
      }
    ]
  }
]

const initialState = {
  users: usersAtStart
}

export const userBlogRemove = (userId, blogId) => {
  return (dispatch) => {
    //console.log(userId, blogId)
    dispatch({
      type: 'REMOVE_USER_BLOG',
      data: { userId, blogId }
    })
  }
}

export const userBlogAdd = (userId, newBlog) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_USER_BLOG',
      data: { userId, newBlog }
    })
  }
}

export const userInitialization = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

const removeBlogFromUser = (user, blogId) => {
  const newblogs = user.blogs.filter(blog => blog._id !== blogId)
  const newuser = { ...user, blogs: newblogs }
  return newuser
}

const reducer = (store = initialState, action) => {
  switch (action.type) {
  case 'REMOVE_USER_BLOG':
    return {
      users: store.users.map(user =>
        user._id !== action.data.userId ?
          user :
          removeBlogFromUser(user, action.data.blogId)
      )
    }
  case 'ADD_USER_BLOG': {
    return  {
      users: store.users.map(user =>
        user._id !== action.data.userId ?
          user :
          { ...user, blogs: [...user.blogs, action.data.newBlog] }
      )
    }
  }
  case 'INIT_USERS':
    return { users: [ ...action.data ] }
  default:
    return store
  }
}

export default reducer