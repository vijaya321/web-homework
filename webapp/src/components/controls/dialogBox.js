import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function DialogBox () {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button color='primary' onClick={handleClickOpen} variant='outlined'>
        Open alert dialog
      </Button>
      <Dialog
        aria-describedby='alert-dialog-description'
        aria-labelledby='alert-dialog-title'
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id='alert-dialog-title'>{`values cannot be null`}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleClose} >
            Disagree
          </Button>
          <Button color='primary' onClick={handleClose} >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
