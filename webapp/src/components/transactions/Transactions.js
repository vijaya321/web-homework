import React, { useState } from 'react'
import TransactionForm from './TransactionForm'
import { gql, useQuery } from '@apollo/client'
import { Grid, makeStyles, Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import Popup from '../controls/popup'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CategoryChart from '../controls/pie-chart/categoryChart'
import convertToRoman from '../controls/convertToRoman'

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  table: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    width: '70%',
    '& thead th': {
      fontWeight: '600',
      color: '#212121',
      backgroundColor: '#e3f2fd'
    },
    '& tbody td': {
      fontWeight: '300'
    },
    '& tbody td .MuiTableCell-root': {
      margin: theme.spacing(1)
    },
    '& tbody tr:hover': {
      backgroundColor: '#f8f8ff',
      cursor: 'pointer'
    },
    '& .MuiTablePagination-actions': {
      backgroundColor: '#fffbf2',
      marginLeft: '10%'
    }
  },
  newButton: {
    position: 'absolute',
    marginTop: theme.spacing(23),
    left: '7em',
    backgroundColor: '#64b5f6',
    textTransform: 'none'
  },
  romanButton: {
    position: 'absolute',
    marginTop: theme.spacing(23),
    left: '17em',
    backgroundColor: '#64b5f6',
    textTransform: 'none'
  }
}))

export const GET_TRANSACTIONS = gql`
  query GetTransactions($user_id: String, $description: String, $merchant_id: String, $amount: Float, $transaction_date: String) {
    transactions(user_id: $user_id, description: $description, merchant_id: $merchant_id, amount: $amount, transaction_date: $transaction_date) {
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
const headCells = [
  { id: 'description', label: 'Transaction Description' },
  { id: 'merchant', label: 'Merchant' },
  { id: 'type', label: 'Type' },
  { id: 'amount', label: 'Amount' },
  { id: 'category', label: 'Category' },
  { id: 'date', label: 'Date' },
  { id: 'actions', label: 'Actions' }
]

export default function Transactions () {
//   const { TblContainer } = useTable()
  const classes = useStyles()
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [romanNumeral, setRomanNumeral] = useState(false)

  const pages = [5, 10, 25]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])

  const { loading, error, data } = useQuery(GET_TRANSACTIONS)

  const [openPopup, setOpenPopup] = useState(false)

  if (loading) return <p>Loading....</p>
  if (error) return <p>{`Error: ${error.message}`}</p>

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const recordsAfterPagingAndSorting = () => {
    return data.transactions.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  const TblPagination = () => (
    <TablePagination
      component='div'
      count={data.transactions.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={pages}
    />
  )

  const openInPopup = (e, item) => {
    e.preventDefault()
    setRecordForEdit(item)
    // window.alert(item)
    setOpenPopup(true)
  }
  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <Button className={classes.newButton}
            color='primary'
            onClick={() => setOpenPopup(true)}
            size='medium'
            startIcon={<AddIcon />}
            variant='contained'>
              Add New
          </Button>
          <Button className={classes.romanButton}
            color='primary'
            onClick={() => setRomanNumeral(prevState => ({
              romanNumeral: !prevState.romanNumeral
            }))}
            size='medium'
            variant='contained'>
              Expenses in Roman Numeral
          </Button>
        </Grid>
        <Grid item xs={6} >
          <CategoryChart expenses={data.transactions} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                headCells.map(headCell => (
                  <TableCell key={headCell.id}>
                    {headCell.label}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              recordsAfterPagingAndSorting().map((item, index) =>
                (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.merchant_id ? item.merchant_id : '-'}</TableCell>
                    {item.credit && <TableCell>credit</TableCell>}
                    {item.debit && <TableCell>debit</TableCell>}
                    {romanNumeral && <TableCell>{convertToRoman(Math.floor(item.amount))}</TableCell>}
                    {!romanNumeral && <TableCell>{item.amount}</TableCell>}
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.transaction_date ? item.transaction_date : '-'}</TableCell>
                    <TableCell>
                      <EditIcon onClick={e => openInPopup(e, item)} />
                      <DeleteIcon />
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}>
            <TransactionForm recordForEdit={recordForEdit} setOpenPopup={setOpenPopup} />
          </Popup>
        </Table>
        <TblPagination />
      </Grid>
    </>
  )
}
