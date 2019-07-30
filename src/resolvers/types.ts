import { objectType } from 'nexus'

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
    t.boolean('isAdmin')
  },
})

export const CandidateWithVote = objectType({
  name: 'CandidateWithVote',
  definition(t) {
    t.id('candidateId')
    t.int('tops')
    t.int('favorites')
    t.int('compromises')
    t.int('vetos')
  }
})