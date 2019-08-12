import React from 'react'
import { Query } from 'react-apollo'
import { createNotification } from '../config'

const renderError = (error, children) => {
  console.log('[GraphQL Query] error: ', error)
  createNotification('error', 'Failed to run graphql query')
  return renderResult(children, {}, false)
}

const renderResult = (children, data, loading) => {
  return React.Children.map(children, child =>
    React.cloneElement(child, { data, loading })
  )
}

export const QueryContainer = ({ children, query, variables, fetchPolicy }) => (
  <Query query={query} variables={variables} fetchPolicy={fetchPolicy}>
    {({ loading, error, data }) => {
      if (error) {
        return renderError(error, children)
      }
      return renderResult(children, data, loading)
    }}
  </Query>
)
