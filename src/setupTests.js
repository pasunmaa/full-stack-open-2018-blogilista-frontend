import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// ignore eslint warning about localStorage being undefined
/* global localStorage:false */

//console.log('setup tests')
configure({ adapter: new Adapter() })

let savedItems = {}
//const window = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: /* () =>  */savedItems = {}
}

//window.localStorage = localStorageMock
global.localStorage = localStorageMock

//export default window