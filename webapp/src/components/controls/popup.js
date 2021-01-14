import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Button } from '@material-ui/core'
import propTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    position: 'absolute',
    top: theme.spacing(8),
    height: '58%',
    width: '62%'
  }
}))

export default function Popup (props) {
  const classes = useStyles()
  const { children, openPopup } = props

  return (
    <Dialog classes={{ paper: classes.dialogWrapper }} maxWidth='md' open={openPopup}>
      <DialogTitle>
        <div>
            Add New Transaction
          <Button
            color='secondary'
            text='X' />
        </div>
      </DialogTitle>
      <DialogContent dividers>
        { children }
      </DialogContent>
    </Dialog>
  )
}

Popup.propTypes = {
  openPopup: propTypes.openPopup,
  children: propTypes.children
}
