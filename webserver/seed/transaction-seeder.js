const Transaction = require('../data-models/Transaction')

const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://localhost:27017/graphql'

// mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var transactions = [
    new Transaction.TransactionModel({
    user_id: '',
    amount: 50.99,
    credit: true,
    debit: false,
    description: 'Food and Beverage!!!',
    merchant_id: 'ShopRite',
    category: 'Food and Beverage'
  })
];

var done = 0;
for (var i = 0; i < transactions.length; i++) {
  transactions[i].save(function(err, result) {
      done++
      if ( done === transactions.length) {
          exit()
      }
  })
}

function exit() {
  mongoose.disconnect()
}
