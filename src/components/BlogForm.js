import React from 'react'
import Notification from './Notification'

const BlogForm = ({ onSubmit, onChange, title, author, url, message}) => {
  return (
    <div>
      <h2>Lisää uusi blogi</h2>

      <form onSubmit={onSubmit}>
        otsikko <input name="title" value={title} onChange={onChange} />
        <br></br>
        kirjoittaja <input name="author" value={author} onChange={onChange} />
        <br></br>
        url <input name="url" value={url} onChange={onChange} />
        <br></br>
        <button type="submit">luo</button>
      </form>

      <Notification message={message} type='error' />
    </div>
  )
}

export default BlogForm