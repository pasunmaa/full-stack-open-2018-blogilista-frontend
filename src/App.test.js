import React from 'react'
import { mount } from 'enzyme'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import Login from './components/Login'
import Blog from './components/Blog'
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
      app = mount(<App />)
      //console.log(app.debug())
      //console.log(app.text())
    })

    it('only login form is rendered', () => {
      expect(app.text()).toContain('käyttäjätunnus')
      expect(app.text()).toContain('salasana')
      expect(app.html()).not.toContain('<h2>Blogit</h2>')
      const loginView = app.find(Login)
      expect(loginView.length).toBe(1)
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
      app = mount(<App />)
      //console.log(app.debug())
    })

    it('login view is not shown', () => {
      app.update()
      expect(app.text()).not.toContain('käyttäjätunnus')
      expect(app.text()).not.toContain('salasana')
      const loginView = app.find(Login)
      expect(loginView.length).toBe(0)
    })

    it('all blogs are rendered', () => {
      app.update()
      expect(app.text()).toContain('Kirjautunut käyttäjä on')
      expect(app.html()).toContain('<h2>Blogit</h2>')
      const blogs = app.find(Blog)
      expect(blogs.length).toBe(blogService.blogs.length)
    })
  })
})