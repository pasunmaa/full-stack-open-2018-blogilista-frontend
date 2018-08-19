import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
//import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  users: userReducer,
  //blogs: anecdoteReducer
})
//console.log(store.getState())

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
