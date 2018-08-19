//const initialMessage = { message: 'All Good!', notificationtype: 'info' }
const initialMessage = { message: '', notificationtype: 'info' }

export const showNotification = (message, time, type) => {
  if (!type)
    type = 'standard'
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      data: { message: message, notificationtype: type }
    })
    window.setTimeout(() => {
      dispatch({
        type: 'RESET',
        data: { message: '', notificationtype: type }
      })
    },
    time * 1000
    )
  }
}

const reducer = (store = initialMessage, action) => {
  let newMessage = ''
  switch (action.type) {
  case 'SET':
    newMessage = action.data
    return newMessage
  case 'RESET':
    newMessage = action.data
    return newMessage
  default:
    return store
  }
}

export default reducer