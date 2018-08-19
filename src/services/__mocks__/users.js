const users = [
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

const getAll = () => {
  return Promise.resolve(users)
}

const setToken = (newToken) => {  // eslint-disable-line
}

export default { getAll, setToken, users }
