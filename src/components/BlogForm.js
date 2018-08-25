import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

const BlogForm = ({ onSubmit, onChange, title, author, url, classes }) => {
  return (
    <Paper className={classes.root}>
      <div className={classes.container}>
        <Typography variant="headline">Lisää uusi blogi</Typography>
        {/* <h2>Lisää uusi blogi</h2> */}
        <form onSubmit={onSubmit}>
          <FormControl className={classes.formControl} required>
            <InputLabel htmlFor="name-simple">Blogin nimi</InputLabel>
            <Input id="name-simple" name="title" value={title} onChange={onChange} autoFocus={true} />
          </FormControl>
          <FormControl className={classes.formControl} required>
            <InputLabel htmlFor="name-simple">Kirjoittaja</InputLabel>
            <Input id="name-simple" name="author" value={author} onChange={onChange} error={false}/>
          </FormControl>
          <FormControl className={classes.formControl} required>
            <InputLabel htmlFor="name-simple">URL</InputLabel>
            <Input id="name-simple" name="url" value={url} onChange={onChange} />
            <FormHelperText id="name-simple-text">URL, josta blogi löytyy</FormHelperText>
          </FormControl>
          <Button
            className={classes.submit}
            variant="contained" color="primary" type="submit" >
            luo
          </Button>
        </form>
      </div>
    </Paper>
  )
}

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BlogForm)