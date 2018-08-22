import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
jest.mock('./services/blogs')
import store from './store'
import blogService from './services/blogs'
import Login from './components/Login'
import App from './App'

// ignore eslint warning about localStorage being undefined
/* global localStorage:false */

describe('<App />', () => {
  // Luo App
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä ei ole kirjautuneena
      localStorage.clear
      app = mount(
        <Provider store={store}>
          <App />
        </Provider>
      )
    })

    it('only login form is rendered', () => {
      expect(app.text()).toContain('käyttäjätunnus')
      expect(app.text()).toContain('salasana')
      expect(app.html()).not.toContain('<h2>Blogit</h2>')
      const loginView = app.find(Login)
      expect(loginView).toHaveLength(1)
      expect(app.find('.login').exists()).toEqual(true)
      expect(app.find('.loggedInUserView').exists()).toEqual(false)
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
      app = mount(
        <Provider store={store}>
          <App />
        </Provider>
      )
    })

    it('login view is not shown', () => {
      app.update()
      expect(app.text()).not.toContain('käyttäjätunnus')
      expect(app.text()).not.toContain('salasana')
      const loginView = app.find(Login)
      expect(loginView).toHaveLength(0)
    })

    it('renders all blogs', () => {
      app.update()
      expect(app.text()).toContain('kirjautuneena.')
      expect(app.html()).toContain('<h2>Blogit</h2>')
      const blogs = app.find('tr.blogItem')
      expect(blogs).toHaveLength(blogService.blogs.length)
    })
  })
})