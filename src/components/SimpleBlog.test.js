import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  it('renders title, author and likes', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)

    //console.log(blogComponent.debug())
    expect(blogComponent.text()).toContain(blog.title)
    expect(blogComponent.text()).toContain(blog.author)
    expect(blogComponent.text()).toContain(blog.likes.toString())
  })

  it('calls likehandler twice, when button is pressed twice', () => {
    const mockHandler = jest.fn()  // mock function for likehandler
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})