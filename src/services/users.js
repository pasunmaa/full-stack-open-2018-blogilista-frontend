import axios from 'axios'

const baseUrl = '/api/users'
/* let token = null

const setToken = (newToken) => {
  if (newToken)
    token = `bearer ${newToken}`
  else
    token = null
  //console.log('uusi token asetettu: ', token)
} */

const getAll = async () => {
  const response = await axios.get(baseUrl)
  //console.log(request.data)
  return (response.data)
}

/*
const createNew = async (newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }

  //console.log(config)
  const response = await axios.post(baseUrl, newBlog, config)
  //console.log('created a new blog: ', response.data, response.status)
  return (response.data)
}

const updateBlog = async (id, blog) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.put(baseUrl+'/'+id, blog, config)
  //console.log('updated blog: ', response.data, response.status)
  return (response.data)
}

*/

export default { getAll }
