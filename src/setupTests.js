import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
jest.mock('./services/blogs')

console.log('Running enzyme setup')
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