import React from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import propTypes from 'prop-types'

export default function ConfirmationMessage (props) {
  const { confirm } = props

  return (
    <>
      <Snackbar
        autoHideDuration={3000}
        open={confirm.isOpen}
      />
      <Alert>
        {confirm.message}
      </Alert>
    </>
  )
}

ConfirmationMessage.propTypes = {
  confirm: propTypes.confirm
}
