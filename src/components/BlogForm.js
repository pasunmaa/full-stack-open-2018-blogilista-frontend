import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit, onChange, title, author, url }) => {
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
    </div>
  )
}

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default BlogForm