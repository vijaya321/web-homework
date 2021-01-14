import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'

ReactDOM.render(
  (
    <div data-app-init=''>
      <Suspense fallback={(<div>Loading...</div>)}>
        <ApolloProvider client={client}>
          <AppRouter />
        </ApolloProvider>
      </Suspense>
    </div>
  ),
  document.getElementById('react-app')
)
