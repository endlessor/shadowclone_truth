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
      'deleteCandidate',
      'deleteUser',
      'deletePosition',
      'deleteUserVote',
    ])

    t.field('createUserVote', {
      type: 'UserVote',
      args: {
        candidateId: idArg(),
        userId: idArg(),
        voteType: 'VoteType'
      },
      resolve: async (parent, {userId, candidateId, voteType}, ctx) => {
        let userVote = await ctx.prisma.userVotes({
          where: { userId, candidateId }
        })
        if (userVote.length === 0) {
          return ctx.prisma.createUserVote({
            userId,
            candidateId,
            vote_type: voteType})
        }
        if (userVote[0].vote_type === voteType) {
          return ctx.prisma.deleteUserVote({ id:userVote[0].id })
        }
        return ctx.prisma.updateUserVote({
          where: { id: userVote[0].id },
          data: { vote_type: voteType }
        })
      }
    })

    t.field('createUserPositionLike', {
      type: 'UserPositionLike',
      args: {
        candidate_positionId: idArg(),
        userId: idArg(),
        like: 'LikeType'
      },
      resolve: async (parent, {userId, candidate_positionId, like}, ctx) => {
        let userPositionLike = await ctx.prisma.userPositionLikes({
          where: { userId, candidate_positionId }
        })
        if (userPositionLike.length === 0) {
          return ctx.prisma.createUserPositionLike({
            userId,
            candidate_positionId,
            like})
        }
        if (userPositionLike[0].like === like) {
          return ctx.prisma.deleteUserPositionLike({ id:userPositionLike[0].id })
        }
        return ctx.prisma.updateUserPositionLike({
          where: { id: userPositionLike[0].id },
          data: { like }
        })
      }
    })

    t.field('createUserQualificationLike', {
      type: 'UserQualificationLike',
      args: {
        qualificationId: idArg(),
        userId: idArg(),
        like: 'LikeType'
      },
      resolve: async (parent, {userId, qualificationId, like}, ctx) => {
        let userQualificationLike = await ctx.prisma.userQualificationLikes({
          where: { userId, qualificationId }
        })
        if (userQualificationLike.length === 0) {
          return ctx.prisma.createUserQualificationLike({
            userId,
            qualificationId,
            like})
        }
        if (userQualificationLike[0].like === like) {
          return ctx.prisma.deleteUserQualificationLike({ id:userQualificationLike[0].id })
        }
        return ctx.prisma.updateUserQualificationLike({
          where: { id: userQualificationLike[0].id },
          data: { like }
        })
      }
    })

    t.field('createPoll', {
      type: 'Poll',
      args: {
        candidateId: idArg(),
        userId: idArg(),
        pollType: 'PollType'
      },
      resolve: async (parent, {userId, candidateId, pollType}, ctx) => {
        let poll = await ctx.prisma.polls({
          where: { userId, candidateId }
        })
        if (poll.length === 0) {
          return ctx.prisma.createPoll({
            userId,
            candidateId,
            poll_type: pollType})
        }
        if (poll[0].poll_type === pollType) {
          return ctx.prisma.deletePoll({ id:poll[0].id })
        }
        return ctx.prisma.updatePoll({
          where: { id: poll[0].id },
          data: { poll_type: pollType }
        })
      }
    })
  },
})

export default Mutation