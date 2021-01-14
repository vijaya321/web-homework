const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User')
const TransactionType = require('./transaction-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLID },
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat },
        category: { type: GraphQLString },
        transaction_date: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount, category, transaction_date }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount, category, transaction_date })).save()
      }
    }
  }
})

module.exports = mutation

