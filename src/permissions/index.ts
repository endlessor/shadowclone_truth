import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
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
    users: rules.isAuthenticatedUser
  },
  Mutation: {
    createCandidate: rules.isAuthenticatedUser,
    createPosition: rules.isAuthenticatedUser,
    createQualification: rules.isAuthenticatedUser,
    createTopic: rules.isAuthenticatedUser,
    createCandidatePosition: rules.isAuthenticatedUser,
    deleteCandidate: rules.isAuthenticatedUser,
    deletePosition: rules.isAuthenticatedUser,
    deleteCandidatePosition: rules.isAuthenticatedUser,
    deleteTopic: rules.isAuthenticatedUser,
    deleteQualification: rules.isAuthenticatedUser,
    updateCandidate: rules.isAuthenticatedUser,
    updateCandidatePosition: rules.isAuthenticatedUser,
    updateTopic: rules.isAuthenticatedUser,
    updatePosition: rules.isAuthenticatedUser,
    updateQualification: rules.isAuthenticatedUser,
    createUserVote: rules.isAuthenticatedUser,
    createUserPositionLike: rules.isAuthenticatedUser,
    createUserQualificationLike: rules.isAuthenticatedUser,
    createPoll: rules.isAuthenticatedUser
  },
})
