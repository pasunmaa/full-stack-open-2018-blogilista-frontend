import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)

    //console.log(blogComponent.debug())
    expect(blogComponent.text()).toContain(blog.title)
    expect(blogComponent.text()).toContain(blog.author)
    expect(blogComponent.text()).toContain(blog.likes.toString())
  })
})