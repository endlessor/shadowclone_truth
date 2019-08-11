import React from 'react'
import { Mutation } from 'react-apollo'
import {
  QUALIFICATIONS,
  CREATE_QUALIFICATION,
  UPDATE_QUALIFICATION,
  DELETE_QUALIFICATION
} from '../../../queries'

export const CreateQualification = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { createQualification } }) => {
        let query = { query: QUALIFICATIONS }
        const data = store.readQuery(query)
        data.qualifications.push(createQualification)
        store.writeQuery({ ...query, data })
      }}
      mutation={CREATE_QUALIFICATION}
    >
      {(createQualification, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            createQualification,
            loading
          })
        })
      }}
    </Mutation>
  )
}

export const UpdateQualification = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { updateQualification } }) => {
        let query = { query: QUALIFICATIONS }
        const data = store.readQuery(query)
        for (let i = 0; i < data.qualifications.length; i++) {
          if (data.qualifications[i].id === updateQualification.id) {
            data.qualifications[i] = updateQualification
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={UPDATE_QUALIFICATION}
    >
      {(updateQualification, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            updateQualification,
            loading
          })
        })
      }}
    </Mutation>
  )
}

export const  DeleteQualification = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { deleteQualification } }) => {
        let query = { query: QUALIFICATIONS }
        const data = store.readQuery(query)
        for (let i = 0; i < data.qualifications.length; i++) {
          if (data.qualifications[i].id === deleteQualification.id) {
            data.qualifications.splice(i, 1)
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={DELETE_QUALIFICATION}
    >
      {(deleteQualification, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            deleteQualification,
            loading
          })
        })
      }}
    </Mutation>
  )
}