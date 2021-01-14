import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, MenuItem, InputLabel, Select, Button } from '@material-ui/core'
import { Form } from '../controls/useForm'
import * as TransactionService from '../controls/transactionService'
import { gql, useMutation } from '@apollo/client'
import propTypes from 'prop-types'
import * as GetTransactions from './Transactions'
import DatePicker from '../controls/datePicker'
// import ConfirmationMessage from '../controls/ConfirmationMessage'

const initialFormValues = {
  id: 0,
  user_id: '',
  description: '',
  merchant_id: '',
  type: '',
  amount: 0.0,
  category: '',
  date: new Date()
}

const mutation = gql`
  mutation addTransaction($id: ID, $user_id: String, $description: String, $merchant_id: String, $debit: Boolean, $credit: Boolean, $amount: Float, $category: String, $transaction_date: String) {
    addTransaction(id: $id, user_id: $user_id, description: $description, merchant_id: $merchant_id, debit: $debit, credit: $credit, amount: $amount, category: $category, transaction_date: $transaction_date){
      id
      user_id
      description
      merchant_id
      debit
      credit
      amount
      category
      transaction_date
    }
  }
`

export default function TransactionForm (props) {
  const { recordForEdit, setOpenPopup } = props
  const [createTransaction] = useMutation(mutation, {
    refetchQueries: () => [{ query: GetTransactions.GET_TRANSACTIONS }]
  })
  const [ formValues, setFormValues ] = useState(initialFormValues)
  // const [ confirm, setConfirm ] = useState({ isOpen: false, message: '' })

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const validateInput = () => {
    if (!formValues.description || !formValues.category || !formValues.type || !formValues.amount) {
      window.alert('values cannot be empty')
    } else return true
  }

  const handleSubmit = (e) => {
    if (validateInput()) {
      e.preventDefault()
      let credit = false
      let debit = false
      if (formValues.type === 'credit') {
        credit = true
      }
      if (formValues.type === 'debit') {
        debit = true
      }
      TransactionService.insertTransaction(createTransaction, formValues, credit, debit, setOpenPopup)
    }
  }

  const handleChange = e => {
    setFormValues({
      ...formValues,
      category: e.target.value
    })
  }

  useEffect(() => {
    if (recordForEdit !== null) {
      setFormValues({
        ...propTypes.recordForEdit
      })
    }
  }, [formValues])

  const categories = TransactionService.getTransactionCategories()

  return (
    <Form>
      <Grid container>
        <Grid item margin='10px' xs={6}>
          <TextField
            label='Description'
            name='description'
            onChange={handleInputChange}
            value={formValues.description}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label='Select Date'
            name='date'
            onChange={handleInputChange}
            value={formValues.date}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Merchant'
            name='merchant_id'
            onChange={handleInputChange}
            value={formValues.merchant_id}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant='outlined'>
            <InputLabel>Category</InputLabel>
            <Select
              id='category-select'
              labelId='category_field'
              onChange={handleChange}
              value={formValues.category}>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category.title}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Amount'
            name='amount'
            onChange={handleInputChange}
            value={formValues.amount}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>Transaction Type</FormLabel>
            <RadioGroup
              name='type'
              onChange={handleInputChange}
              row
              value={formValues.type}>
              <FormControlLabel control={<Radio />} label='Credit' value='credit' />
              <FormControlLabel control={<Radio />} label='Debit' value='debit' />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid>
          <div display='flex'>
            <Button
              color='primary'
              onClick={e => handleSubmit(e)}
              size='small'
              type='submit'
              variant='contained'>
                Create
            </Button>
            <Button
              color='default'
              onClick=''
              size='small'
              type='submit'
              variant='contained'>
                Cancel
            </Button>
          </div>
        </Grid>
      </Grid>
      {/* <ConfirmationMessage
        confirm={confirm}
        setConfirm={setConfirm} /> */}
    </Form>
  )
}

TransactionForm.propTypes = {
  recordForEdit: propTypes.recordForEdit,
  setOpenPopup: propTypes.setOpenPopup
}
