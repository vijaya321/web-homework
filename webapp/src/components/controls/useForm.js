import React from 'react'
import { makeStyles } from '@material-ui/core'
import propTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(3),
    '& input': {
      width: '15em'
    },
    '& .MuiSelect-root': {
      width: '17.5em'
    },
    '& .MuiButton-containedSizeSmall': {
      textTransform: 'none',
      marginLeft: '1em',
      marginTop: '3em'
    },
    '& .MuiButton-containedPrimary': {
      textTransform: 'none',
      backgroundColor: '#64b5f6',
      marginLeft: '20em'
    }
  }
}))

export function Form (props) {
  const classes = useStyles()

  return (
    <form autoComplete='off' className={classes.form}>
      { props.children }
    </form>
  )
}

Form.propTypes = {
  children: propTypes.children
}
