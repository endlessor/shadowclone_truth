import Query from './query'
import Mutation from './mutation'
import { AuthPayload, CandidateWithVote, CountAttribute, PositionWithLike } from './types'
import { User } from './user'

export const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  User,
  CandidateWithVote,
  CountAttribute,
  PositionWithLike
}
