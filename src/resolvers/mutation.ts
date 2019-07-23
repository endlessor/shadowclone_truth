import { prismaObjectType } from 'nexus-prisma'
import { stringArg, idArg, intArg } from 'nexus/dist';

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.prismaFields([
      'createUser',
      'createCandidate',
      'createPosition',
      'createQualification',
      'createTopic',
      'createUserPositionLike',
      'createUserQualificationLike',
      'createPoll',
      'updateCandidate'
    ])

    t.field('createUserVote', {
      type: 'UserVote',
      args: {
        candidateId: idArg(),
        userId: idArg(),
        voteType: 'VoteType'
      },
      resolve: (parent, {userId, candidateId, voteType}, ctx) => {
        return ctx.prisma.createUserVote({
          user: { connect: {id: userId}},
          candidate: { connect: {id: candidateId}},
          vote_type: voteType})
      }
    })
  },
})

export default Mutation