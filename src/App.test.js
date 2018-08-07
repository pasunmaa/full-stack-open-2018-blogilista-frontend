import React from 'react'
import { mount } from 'enzyme'
import window from './setupTests'
jest.mock('./services/blogs')
import Login from './components/Login'
import App from './App'


describe('<App />', () => {
  // Luo App
  let app

  beforeAll(() => {
    app = mount(<App />)
    console.log(app.debug())
    //window.localStorage.clear()
  })

  describe('when user is not logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä ei ole kirjautuneena
      window.localStorage.clear()
    })

    it('only login form is rendered', () => {
      //console.log(app.debug())
      app.update()
      /* const loginView = app.find(Login)
      expect(loginView).toContain('käyttäjätunnus')
      expect(loginView).toContain('salasana') */
      // ... login vs loggedInUserView
      expect(app.find('.login').exists()).to.equal(true)
      expect(app.find('.loggedInUserView').exists()).to.equal(false)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä on kirjautuneena
      const user = {
        username: 'pasunmaa',
        token: '1231231214',
        name: 'Petri Asunmaa'
      }

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    })

    it('all blogs are rendered', () => {
      app.update()
      // ...
    })
  })
})