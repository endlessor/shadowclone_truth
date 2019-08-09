import { objectType } from 'nexus'
import { GraphQLUpload } from 'graphql-upload'

export const Upload = GraphQLUpload

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
    t.int('unknowns')
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

export const PositionWithLike = objectType({
  name: 'PositionWithLike',
  definition(t) {
    t.field('position', { type: 'Position' })
    t.int('likes')
    t.int('dislikes')
  }
})

export const QualificationWithLike = objectType({
  name: 'QualificationWithLike',
  definition(t) {
    t.field('qualification', { type: 'Qualification' })
    t.int('likes')
    t.int('dislikes')
  }
})

export const UserProfile = objectType({
  name: 'UserProfile',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('email')
    t.string('gender')
    t.boolean('isAdmin')
  },
})