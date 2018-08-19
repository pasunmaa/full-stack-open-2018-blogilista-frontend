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


/* export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote //{ ...content }
    })
  }
}

export const anecdoteVoting = (id, content, votes) => {
  return async (dispatch) => {
    await anecdoteService.anecdoteVote(id, content, votes)
    dispatch({
      type: 'VOTE',
      data: id
    })
  }
} */

export const userInitialization = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    //console.log(users)
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

const reducer = (store = usersAtStart/* [] */, action) => {
  switch (action.type) {
  case 'VOTE':
  {
    //console.log(action)
    const old = store.filter(a => a.id !== action.data) // action.data.id)
    const voted = store.find(a => a.id === action.data) // action.data.id)
    //console.log([...old, { ...voted, votes: voted.votes+1 } ])
    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  case 'CREATE':
    //console.log(action)
    return [...store, { ...action.data }]
  case 'INIT_USERS':
    return action.data
  default:
    return store
  }
}

export default reducer