import { prismaObjectType } from 'nexus-prisma'
import { getUserId } from '../utils'

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields([
      'candidates',
      'users',
      'positions',
      'qualifications',
      'userPositionLikes',
      'userQualificationLikes',
      'userVotes',
      'polls',
      'topics',
      'candidatePositions'
    ]),

    t.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user({ id: userId })
      },
    })
  }
})

export default Query