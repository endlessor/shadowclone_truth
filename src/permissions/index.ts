import { rule, shield } from 'graphql-shield'
import { getUserId, checkAdminUser } from '../utils'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isAdminUser: rule()((parent, args, context) => {
    return checkAdminUser(context)
  }),
  // isPostOwner: rule()(async (parent, { id }, context) => {
  //   const userId = getUserId(context)
  //   const author = await context.prisma.post({ id }).author()
  //   return userId === author.id
  // }),
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    users: rules.isAdminUser,
    voteAttributes: rules.isAdminUser,
    candidatesWithVotes: rules.isAdminUser,
  },
  Mutation: {
    createCandidate: rules.isAdminUser,
    createPosition: rules.isAdminUser,
    createQualification: rules.isAuthenticatedUser,
    createTopic: rules.isAuthenticatedUser,
    createCandidatePosition: rules.isAuthenticatedUser,
    deleteCandidate: rules.isAdminUser,
    deletePosition: rules.isAdminUser,
    deleteCandidatePosition: rules.isAuthenticatedUser,
    deleteTopic: rules.isAuthenticatedUser,
    deleteQualification: rules.isAuthenticatedUser,
    updateCandidate: rules.isAdminUser,
    updateCandidatePosition: rules.isAuthenticatedUser,
    updateTopic: rules.isAuthenticatedUser,
    updatePosition: rules.isAdminUser,
    updateQualification: rules.isAuthenticatedUser,
    createUserVote: rules.isAuthenticatedUser,
    createUserPositionLike: rules.isAuthenticatedUser,
    createUserQualificationLike: rules.isAuthenticatedUser,
    createPoll: rules.isAuthenticatedUser
  },
})
