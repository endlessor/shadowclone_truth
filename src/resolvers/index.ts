import Query from './query'
import Mutation from './mutation'
import { 
  AuthPayload, 
  CandidateWithVote, 
  CountAttribute, 
  PositionWithLike, 
  QualificationWithLike,
  Upload, 
  UserProfile
} from './types'
import { User } from './user'

export const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  User,
  CandidateWithVote,
  CountAttribute,
  PositionWithLike,
  QualificationWithLike,
  Upload,
  UserProfile
}
