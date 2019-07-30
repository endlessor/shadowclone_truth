import Query from './query'
import Mutation from './mutation'
import { AuthPayload, CandidateWithVote } from './types'
import { User } from './user'

export const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  User,
  CandidateWithVote
}
