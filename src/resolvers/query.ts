import { prismaObjectType } from 'nexus-prisma'
import { getUserId } from '../utils'
import { VoteType, LikeType } from '../../generated/prisma-client';

const posLikeFragment = `
  fragment userPositionLike on UserPositionLike {
    id
    userId
    like
    time
    latest
    candidate_position {
      id
      candidateId
      positionId
    }
  }
`

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields([
      'users',
      'positions',
      'qualifications',
      'userPositionLikes',
      'userQualificationLikes',
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
              candidates[i].vote_type = voteType
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
      type: 'UserProfile',
      resolve: async (parent, args, ctx) => {
        const userId = getUserId(ctx)
        const user = await ctx.prisma.user({ id: userId })
        return {
          ...user,
          isAdmin: user.role === 1
        }
      },
    })

    t.list.field('userVotes', {
      type: 'UserVote',
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.userVotes({ where: { userId: userId } })
      },
    })

    t.field('voteAttributes', {
      type: 'CountAttribute',
      resolve: async (parent, args, ctx) => {
        const userVotes = await ctx.prisma.userVotes({ orderBy: 'id_ASC' })
        const users = await ctx.prisma.users({ orderBy: 'id_ASC'})
        const getVotesCount = (voteType: VoteType) => {
          const votes = userVotes.filter(vote => vote.vote_type === voteType)
          return votes ? votes.length : 0
        }
        const [ tops, favorites, compromises, vetos ] = [ 
          getVotesCount('TOP'),
          getVotesCount('FAVORITE'),
          getVotesCount('COMPROMISE'),
          getVotesCount('VETO') 
        ]
        return {
          prevotes: userVotes.length,
          topCount: tops,
          favoriteCount: favorites,
          compromiseCount: compromises,
          vetoCount: vetos,
          average_top: Math.round(tops * 100 / users.length) / 100,
          average_favorite: Math.round(favorites * 100 / users.length) / 100,
          average_compromise: Math.round(compromises * 100 / users.length) / 100,
          average_veto: Math.round(vetos * 100 / users.length) / 100
        }
      },
    })

    t.list.field('candidatesWithVotes', {
      type: 'CandidateWithVote',
      resolve: async (parent, args, ctx) => {
        const candidates = await ctx.prisma.candidates({ orderBy: 'id_ASC'})
        const userVotes = await ctx.prisma.userVotes({ orderBy: 'id_ASC'})
        const getVotesCount = (id: String, voteType: VoteType) => {
          const votes = userVotes.filter((vote) => {
            return vote.candidateId === id && vote.vote_type === voteType
          })
          return votes ? votes.length : 0
        }
        return candidates.map(candidate => {
          return {
            candidate: candidate,
            tops: getVotesCount(candidate.id, 'TOP'),
            favorites: getVotesCount(candidate.id, 'FAVORITE'),
            compromises: getVotesCount(candidate.id, 'COMPROMISE'),
            vetos: getVotesCount(candidate.id, 'VETO')
          }          
        })
      }
    })

    t.list.field('positionsWithLikes', {
      type: 'PositionWithLike',
      resolve: async (parent, args, ctx) => {
        const posLikes = await ctx.prisma.userPositionLikes().$fragment(posLikeFragment) as Array<any>
        const positions = await ctx.prisma.positions({ orderBy: 'id_ASC' })
        const likeCount = (id: String, likeType: LikeType) => {
          const likes = posLikes.filter(posLike => {
            return posLike.candidate_position.positionId === id &&
              posLike.like === likeType
          })
          return likes.length
        }
        return positions.map(position => {
          return {
            position: position,
            likes: likeCount(position.id, 'LIKE'),
            dislikes: likeCount(position.id, 'DISLIKE')
          }
        })
      }
    })
  }
})

export default Query