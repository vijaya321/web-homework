export const getTransactionCategories = () => ([
  { id: '1', title: 'Automobile' },
  { id: '2', title: 'Food and Beverage' },
  { id: '3', title: 'Groceries' },
  { id: '4', title: 'House Hold' },
  { id: '5', title: 'Utilities' }
])

export function insertTransaction (createTransaction, formValues, credit, debit, setOpenPopup) {
  const id = formValues.id
  const userId = formValues.user_id
  const description = formValues.description
  const merchantId = formValues.merchant_id
  const amount = parseFloat(formValues.amount)
  const category = formValues.category
  const date = formValues.date

  try {
    createTransaction({ variables: { id: id, user_id: userId, description: description, merchant_id: merchantId, debit: debit, credit: credit, amount: amount, category: category, transaction_date: date } })
    setOpenPopup(false)
  } catch (e) {
    console.log('error', e)
  }
}

// export function deleteTransaction (deleteTransaction, index) {
//   try {
//     deleteTransaction({ variables: { user_id: 1 } })
//   } catch (e) {
//     console.log('error', e)
//   }
// }
