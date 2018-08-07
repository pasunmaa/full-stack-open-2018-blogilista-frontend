import React from 'react'
import { mount } from 'enzyme'
import window from './setupTests'
import App from './App'


describe('<App />', () => {
  // Luo App
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä ei ole kirjautuneena
    })

    it('only login form is rendered', () => {
      app.update()
      // ...
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

    it('all notes are rendered', () => {
      app.update()
      // ...
    })
  })
})