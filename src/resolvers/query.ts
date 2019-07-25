import { prismaObjectType } from 'nexus-prisma'
import { getUserId } from '../utils'
import { VoteType } from '../../generated/prisma-client';

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields([
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

    // get candidates in the order of voteTypes
    t.list.field('candidates', {
      type: 'Candidate',
      nullable: true,
      resolve: async (parent, args, ctx) => {
        const userId = getUserId(ctx)
        const candidates = await ctx.prisma.candidates({ orderBy: "latest_poll_DESC"})
        if (!userId) return candidates
        const myVotes = await ctx.prisma.userVotes({ orderBy: "id_ASC"})
        let nonVotedCandidates = []

        const filterByVotes = (voteType: VoteType) => {
          let filteredCandidates = []
          for(let i = candidates.length - 1; i >= 0; i--) {
            let result = myVotes.filter(vote => {
              return candidates[i].id === vote.candidateId && userId === vote.userId
            })
            if (result.length === 0) {
              nonVotedCandidates.unshift(candidates[i])
              candidates.splice(i, 1)
              continue
            }
            if(result[0].vote_type === voteType) {
              filteredCandidates.unshift(candidates[i])
              candidates.splice(i, 1)
            }
          }
          return filteredCandidates
        }

        return filterByVotes('TOP').concat(
          filterByVotes('FAVORITE'),
          filterByVotes('COMPROMISE'),
          filterByVotes('VETO'),
          filterByVotes('UNKNOWNS'),
          nonVotedCandidates
        )
      },
    })
    
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