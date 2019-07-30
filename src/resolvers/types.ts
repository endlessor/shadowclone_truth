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
    t.field('candidate', { type: 'Candidate'})
    t.int('tops')
    t.int('favorites')
    t.int('compromises')
    t.int('vetos')
  }
})

export const CountAttribute = objectType({
  name: 'CountAttribute',
  definition(t) {
    t.int('prevotes')
    t.int('topCount')
    t.int('favoriteCount')
    t.int('compromiseCount')
    t.int('vetoCount')
    t.float('average_top')
    t.float('average_favorite')
    t.float('average_compromise')
    t.float('average_veto')
  }
})