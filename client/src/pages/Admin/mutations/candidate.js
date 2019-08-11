import React from 'react'
import { Mutation } from 'react-apollo'
import {
  ADMIN_CANDIDATES,
  CREATE_CANDIDATE,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE
} from '../../../queries'

export const CreateCandidate = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { createCandidate } }) => {
        let query = { query: ADMIN_CANDIDATES }
        const data = store.readQuery(query)
        const newCandidate = {
          candidate: createCandidate,
          tops: 0,
          favorites: 0,
          compromises: 0,
          vetos: 0
        }
        data.candidatesWithVotes.push(newCandidate)
        store.writeQuery({ ...query, data })
      }}
      mutation={CREATE_CANDIDATE}
    >
      {(createCandidate, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            createCandidate,
            loading
          })
        })
      }}
    </Mutation>
  )
}

export const UpdateCandidate = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { updateCandidate } }) => {
        let query = { query: ADMIN_CANDIDATES }
        const data = store.readQuery(query)
        for (let i = 0; i < data.candidatesWithVotes.length; i++) {
          if (data.candidatesWithVotes[i].candidate.id === updateCandidate.id) {
            data.candidatesWithVotes[i].candidate = updateCandidate
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={UPDATE_CANDIDATE}
    >
      {(updateCandidate, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            updateCandidate,
            loading
          })
        })
      }}
    </Mutation>
  )
}

export const  DeleteCandidate = ({ children }) => {
  return (
    <Mutation
      update={(store, { data: { deleteCandidate } }) => {
        let query = { query: ADMIN_CANDIDATES }
        const data = store.readQuery(query)
        for (let i = 0; i < data.candidatesWithVotes.length; i++) {
          if (data.candidatesWithVotes[i].candidate.id === deleteCandidate.id) {
            data.candidatesWithVotes.splice(i, 1)
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={DELETE_CANDIDATE}
    >
      {(deleteCandidate, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            deleteCandidate,
            loading
          })
        })
      }}
    </Mutation>
  )
}