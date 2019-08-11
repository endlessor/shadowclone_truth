import React from 'react'
import { Mutation } from 'react-apollo'
import {
  POSITIONS,
  CREATE_POSITION,
  UPDATE_POSITION,
  DELETE_POSITION
} from '../../../queries'

export const CreatePosition = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { createPosition } }) => {
        let query = { query: POSITIONS }
        const data = store.readQuery(query)
        data.positions.push(createPosition)
        store.writeQuery({ ...query, data })
      }}
      mutation={CREATE_POSITION}
    >
      {(createPosition, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            createPosition,
            loading
          })
        })
      }}
    </Mutation>
  )
}

export const UpdatePosition = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { updatePosition } }) => {
        let query = { query: POSITIONS }
        const data = store.readQuery(query)
        for (let i = 0; i < data.positions.length; i++) {
          if (data.positions[i].id === updatePosition.id) {
            data.positions[i] = updatePosition
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={UPDATE_POSITION}
    >
      {(updatePosition, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            updatePosition,
            loading
          })
        })
      }}
    </Mutation>
  )
}

export const  DeletePosition = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { deletePosition } }) => {
        let query = { query: POSITIONS }
        const data = store.readQuery(query)
        for (let i = 0; i < data.positions.length; i++) {
          if (data.positions[i].id === deletePosition.id) {
            data.positions.splice(i, 1)
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={DELETE_POSITION}
    >
      {(deletePosition, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            deletePosition,
            loading
          })
        })
      }}
    </Mutation>
  )
}