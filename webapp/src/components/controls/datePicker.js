import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import propTypes from 'prop-types'

export default function DatePicker (props) {
  const { name, label, value, onChange } = props

  const convertToDefEventPara = (name, value) => ({
    target: {
      name, value
    }
  })

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker disableToolbar format='MMM/dd/yyyy' inputVariant='outlined'
        label={label}
        name={name}
        onChange={date => onChange(convertToDefEventPara(name, date))}
        value={value} variant='inline'
      />
    </MuiPickersUtilsProvider>
  )
}

DatePicker.propTypes = {
  name: propTypes.name,
  label: propTypes.label,
  value: propTypes.value,
  onChange: propTypes.onChange
}
