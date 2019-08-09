import { rule, shield } from 'graphql-shield'
import { getUserId, checkAdminUser } from '../utils'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isAdminUser: rule()((parent, args, context) => {
    return checkAdminUser(context)
  })
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    users: rules.isAdminUser,
    userVotes: rules.isAuthenticatedUser,
    voteAttributes: rules.isAdminUser,
    candidatesWithVotes: rules.isAuthenticatedUser,
    positionsWithLikes: rules.isAdminUser,
    qualificationsWithLikes: rules.isAdminUser
  },
  Mutation: {
    createCandidate: rules.isAdminUser,
    createPosition: rules.isAdminUser,
    createQualification: rules.isAdminUser,
    createCandidatePosition: rules.isAdminUser,

    deleteCandidate: rules.isAdminUser,
    deletePosition: rules.isAdminUser,
    deleteCandidatePosition: rules.isAdminUser,
    deleteQualification: rules.isAdminUser,

    updateCandidate: rules.isAdminUser,
    updateCandidatePosition: rules.isAdminUser,
    updatePosition: rules.isAdminUser,
    updateQualification: rules.isAdminUser,

    createUserVote: rules.isAuthenticatedUser,
    createUserPositionLike: rules.isAuthenticatedUser,
    createUserQualificationLike: rules.isAuthenticatedUser,
    createPoll: rules.isAuthenticatedUser
  },
})
