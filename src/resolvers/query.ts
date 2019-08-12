import { prismaObjectType } from 'nexus-prisma'
import { getUserId } from '../utils'
import { VoteType, LikeType } from '../../generated/prisma-client';
import { idArg } from 'nexus/dist';
import { reorderCandidate } from './utils'

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields([
      'users',
      'positions',
      'topics',
      'userPositionLikes',
      'userQualificationLikes',
      'position',
      'qualification',
      'polls',
    ]),

    // get candidates in the order of voteTypes
    t.list.field('candidates', {
      type: 'Candidate',
      nullable: true,
      resolve: async (parent, args, ctx) => {
        const userId = getUserId(ctx)
        const candidates = await ctx.prisma.candidates({ orderBy: "latest_poll_DESC" })
        if (!userId) return candidates
        const myVotes = await ctx.prisma.userVotes({ where: { userId: userId }})
        return reorderCandidate(candidates, myVotes)
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

    t.list.field('candidatePositions', {
      type: 'Position',
      args: {
        candidateId: idArg({required: true})
      },
      resolve: async (parent, args, ctx) => {
        const candPoses = await ctx.prisma.candidatePositions({
          where: { candidateId: args.candidateId }
        })
        const userId = getUserId(ctx)
        const posLikes = await ctx.prisma.userPositionLikes({ 
          where: { userId: userId, candidateId: args.candidateId }
        })
        const positions = await ctx.prisma.positions({ orderBy: 'id_ASC' })

        const result = []
        candPoses.forEach( candPos => {
          const position = positions.filter(p => p.id === candPos.positionId)
          if (position.length === 0) return
          if (userId) {
            const pls = posLikes.filter(pl => pl.positionId = position[0].id)
            if (pls.length > 0) position[0].like_type = pls[0].like
          }
          result.push(position[0])
        })
        return result
      },
    })

    t.list.field('candidateQualifications', {
      type: 'Qualification',
      args: {
        candidateId: idArg({required: true})
      },
      resolve: async (parent, args, ctx) => {
        const qualifications = await ctx.prisma.qualifications({
          where: { candidateId: args.candidateId }
        })
        const userId = getUserId(ctx)
        const qualLikes = await ctx.prisma.userQualificationLikes({
          where: { userId: userId}
        })
        if (userId) {
          qualifications.forEach( qualification => {
            const result = qualLikes.filter(ql => ql.qualificationId === qualification.id)
            if (result.length > 0) qualification.like_type = result[0].like
          })
        }
        return qualifications
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
          return votes.length
        }
        const [ tops, favorites, compromises, vetos, unknowns ] = [ 
          getVotesCount('TOP'),
          getVotesCount('FAVORITE'),
          getVotesCount('COMPROMISE'),
          getVotesCount('VETO'),
          getVotesCount('UNKNOWNS')
        ]
        return {
          prevotes: userVotes.length,
          users: users.length,
          topCount: tops,
          favoriteCount: favorites,
          compromiseCount: compromises,
          vetoCount: vetos,
          unknownCount: unknowns,
          average_top: Math.round(tops * 1000 / users.length) / 10,
          average_favorite: Math.round(favorites * 1000 / users.length) / 10,
          average_compromise: Math.round(compromises * 1000 / users.length) / 10,
          average_veto: Math.round(vetos * 1000 / users.length) / 10,
          average_unknown: Math.round(unknowns * 1000 / users.length) / 10
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
          return votes.length
        }
        return candidates.map(candidate => {
          return {
            candidate: candidate,
            tops: getVotesCount(candidate.id, 'TOP'),
            favorites: getVotesCount(candidate.id, 'FAVORITE'),
            compromises: getVotesCount(candidate.id, 'COMPROMISE'),
            vetos: getVotesCount(candidate.id, 'VETO'),
            unknowns: getVotesCount(candidate.id, 'UNKNOWNS')
          }          
        })
      }
    })

    t.list.field('candidatesWithVotesPercent', {
      type: 'CandidateWithVote',
      resolve: async (parent, args, ctx) => {
        const userId = getUserId(ctx)
        const candidates = await ctx.prisma.candidates({ orderBy: 'id_ASC'})
        const userVotes = await ctx.prisma.userVotes({ orderBy: 'id_ASC'})
        const users = await ctx.prisma.users({ orderBy: 'id_ASC'})
        const myVotes = userVotes.filter(v => v.userId === userId)
        const orderedCandidates = reorderCandidate(candidates, myVotes)
        const getVotesCountPercent = (id: String, voteType: VoteType) => {
          const votes = userVotes.filter((vote) => {
            return vote.candidateId === id && vote.vote_type === voteType
          })
          return Math.round(votes.length * 1000 / users.length) / 10
        }
        return orderedCandidates.map(candidate => {
          return {
            candidate: candidate,
            tops: getVotesCountPercent(candidate.id, 'TOP'),
            favorites: getVotesCountPercent(candidate.id, 'FAVORITE'),
            compromises: getVotesCountPercent(candidate.id, 'COMPROMISE'),
            vetos: getVotesCountPercent(candidate.id, 'VETO'),
            unknowns: getVotesCountPercent(candidate.id, 'UNKNOWNS')
          }          
        })
      }
    })

    t.list.field('positionsWithLikes', {
      type: 'PositionWithLike',
      resolve: async (parent, args, ctx) => {
        const posLikes = await ctx.prisma.userPositionLikes({ orderBy: 'id_ASC'})
        const positions = await ctx.prisma.positions({ orderBy: 'id_ASC' })
        const likeCount = (id: String, likeType: LikeType) => {
          const likes = posLikes.filter(posLike => {
            return posLike.positionId === id && posLike.like === likeType
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

    t.list.field('qualificationsWithLikes', {
      type: 'QualificationWithLike',
      resolve: async (parent, args, ctx) => {
        const qualLikes = await ctx.prisma.userQualificationLikes({ orderBy: 'id_ASC'})
        const qualifications = await ctx.prisma.qualifications({ orderBy: 'id_ASC' })
        const likeCount = (id: String, likeType: LikeType) => {
          const likes = qualLikes.filter(qualLike => {
            return qualLike.qualificationId === id && qualLike.like === likeType
          })
          return likes.length
        }
        return qualifications.map(qualification => {
          return {
            qualification: qualification,
            likes: likeCount(qualification.id, 'LIKE'),
            dislikes: likeCount(qualification.id, 'DISLIKE')
          }
        })
      }
    })
  }
})

export default Query