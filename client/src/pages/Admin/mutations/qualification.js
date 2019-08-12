import React from 'react'
import { Mutation } from 'react-apollo'
import {
  CandidateQualificationsQuery,
  CREATE_QUALIFICATION,
  UPDATE_QUALIFICATION,
  DELETE_QUALIFICATION
} from '../../../queries'

export const CreateQualification = ({ children, candidateId }) => {
  return (
    <Mutation
      update={(store, { data: { createQualification } }) => {
        let query = { 
          query: CandidateQualificationsQuery,  variables: { candidateId } 
        }
        const data = store.readQuery(query)
        data.candidateQualifications.push(createQualification)
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

export const UpdateQualification = ({ children, candidateId }) => {
  return (
    <Mutation
      update={(store, { data: { updateQualification } }) => {
        let query = { 
          query: CandidateQualificationsQuery,  variables: { candidateId } 
        }
        const data = store.readQuery(query)
        for (let i = 0; i < data.candidateQualifications.length; i++) {
          if (data.candidateQualifications[i].id === updateQualification.id) {
            data.candidateQualifications[i] = updateQualification
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

export const  DeleteQualification = ({ children, candidateId }) => {
  return (
    <Mutation
      update={(store, { data: { deleteQualification } }) => {
        let query = { 
          query: CandidateQualificationsQuery,  variables: { candidateId } 
        }
        const data = store.readQuery(query)
        for (let i = 0; i < data.candidateQualifications.length; i++) {
          if (data.candidateQualifications[i].id === deleteQualification.id) {
            data.candidateQualifications.splice(i, 1)
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