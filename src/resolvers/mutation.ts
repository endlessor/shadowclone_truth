import { prismaObjectType } from 'nexus-prisma'

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
      'createUserVote',
      'createPoll'
    ])
  },
})

export default Mutation