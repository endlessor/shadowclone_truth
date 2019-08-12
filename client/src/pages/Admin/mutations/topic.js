import React from 'react'
import { Mutation } from 'react-apollo'
import {
  TOPICS,
  CREATE_TOPIC,
  UPDATE_TOPIC,
  DELETE_TOPIC
} from '../../../queries'

export const CreateTopic = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { createTopic } }) => {
        let query = { query: TOPICS }
        const data = store.readQuery(query)
        data.topics.push(createTopic)
        store.writeQuery({ ...query, data })
      }}
      mutation={CREATE_TOPIC}
    >
      {(createTopic, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            createTopic,
            loading
          })
        })
      }}
    </Mutation>
  )
}

export const UpdateTopic = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { updateTopic } }) => {
        let query = { query: TOPICS }
        const data = store.readQuery(query)
        for (let i = 0; i < data.topics.length; i++) {
          if (data.topics[i].id === updateTopic.id) {
            data.topics[i] = updateTopic
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={UPDATE_TOPIC}
    >
      {(updateTopic, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            updateTopic,
            loading
          })
        })
      }}
    </Mutation>
  )
}

export const  DeleteTopic = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { deleteTopic } }) => {
        let query = { query: TOPICS }
        const data = store.readQuery(query)
        for (let i = 0; i < data.topics.length; i++) {
          if (data.topics[i].id === deleteTopic.id) {
            data.topics.splice(i, 1)
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={DELETE_TOPIC}
    >
      {(deleteTopic, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            deleteTopic,
            loading
          })
        })
      }}
    </Mutation>
  )
}