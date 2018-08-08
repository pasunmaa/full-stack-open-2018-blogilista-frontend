import React from 'react'
import { mount } from 'enzyme'
jest.mock('./services/blogs')
import Login from './components/Login'
import App from './App'


describe('<App />', () => {
  // Luo App
  let app

  beforeAll(() => {
    //app = mount(<App />)
    //console.log(app.debug())
    //window.localStorage.clear()
  })

  describe('when user is not logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä ei ole kirjautuneena
      localStorage.clear
      app = mount(<App />)
      //console.log(app.debug())
      console.log(app.text())
    })

    it('only login form is rendered', () => {
      expect(app.text()).toContain('käyttäjätunnus')
      expect(app.text()).toContain('salasana')
      expect(app.html()).not.toContain('<h2>Blogit</h2>')
      /* const loginView = app.find(Login)
      expect(loginView).toContain('käyttäjätunnus')
      expect(loginView).toContain('salasana') */
      // ... login vs loggedInUserView
      /* expect(app.find('.login').exists()).to.equal(true)
      expect(app.find('.loggedInUserView').exists()).to.equal(false) */
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
      /* window. */localStorage.setItem('loggedAppUser', JSON.stringify(user))
      app = mount(<App />)
      //console.log(app.debug())
    })

    it('all blogs are rendered', () => {
      app.update()
      expect(app.text()).toContain('Kirjautunut käyttäjä on')
      expect(app.html()).toContain('<h2>Blogit</h2>')
      expect(app.text()).not.toContain('käyttäjätunnus')
      expect(app.text()).not.toContain('salasana')
    })
  })
})