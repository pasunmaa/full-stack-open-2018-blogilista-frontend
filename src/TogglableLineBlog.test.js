import React from 'react'
import { shallow } from 'enzyme'
//import Adapter from 'enzyme-adapter-react-16'
import TogglableLine from './components/TogglableLine'
import Blog from './components/Blog'

describe.only('Blog and TogglableLine component', () => {
  let togglableLine
  let initialBlogs = []
  let blog

  beforeEach(() => {
    initialBlogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      }
    ]

    blog = initialBlogs[0]
    //console.log(blog)
    const doNothing = () => {}

    togglableLine = shallow(
      <TogglableLine className="blogshort"
        key={'line'+blog.id}
        linetext={blog.title}
        ref={component => this.blogList[blog.id] = component}
        showactionbutton={false}
        actionlable={''}
        actionbutton={doNothing}>
        <Blog className="bloglong"
          key={'blog'+blog._id}
          blog={blog}
          likeIncrease={doNothing}/>
      </TogglableLine>
    )
  })

  it('initially shows only title', () => {
    //const appComponent = shallow(<App note={note} />)
    const shortDiv = togglableLine.find('.togglableLine')
    const longDiv = togglableLine.find('.togglableContent')
    //console.log(shortDiv.debug(), shortDiv.text())//, shortDiv.html())

    expect(shortDiv.text()).toContain(blog.title)
    expect(longDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('shows the details after clicking the line', () => {
    //const appComponent = shallow(<App note={note} />)
    // haetaan klikattava osa komponentista
    const shortDiv = togglableLine.find('.togglableLine')
    //console.log(shortDiv.html())
    shortDiv.simulate('click')

    // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
    const longDiv = togglableLine.find('.togglableContent')
    //console.log(longDiv.html(), '\n', longDiv.text())
    expect(longDiv.text()).toContain(blog.title)
    expect(longDiv.html()).toContain(blog.author)
    expect(longDiv.html()).toContain(blog.likes.toString())
  })
})