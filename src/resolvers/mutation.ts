import { prismaObjectType } from 'nexus-prisma'
import { stringArg, idArg, intArg } from 'nexus/dist';
import { hash, compare } from 'bcrypt'
import { APP_SECRET, getUserId } from '../utils'
import { sign } from 'jsonwebtoken'

const uuid = require('uuid/v1')
const aws = require('aws-sdk')
require('dotenv').config()

const s3 = new aws.S3({
  accessKeyId: process.env.S3ACCESSKEY,
  secretAccessKey: process.env.S3SECRETKEY,
  params: {
    Bucket: process.env.S3BUCKET
  },
  endpoint: new aws.Endpoint(process.env.S3ENDPOINT) // fake s3 endpoint for local dev
})

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.prismaFields([
      'createPosition',
      'createQualification',
      'createTopic',
      'createCandidatePosition',
      'deleteCandidate',
      'deletePosition',
      'deleteCandidatePosition',
      'deleteTopic',
      'deleteQualification',
      'updateCandidatePosition',
      'updateTopic',
      'updatePosition',
      'updateQualification',
    ])

    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg({required: true}),
        password: stringArg({required: true}),
      },
      resolve: async (parent, { name, email, password }, ctx) => {
        if (password.length < 8) {
          throw new Error(`Password should be at least 8 in length`)
        }
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.createUser({
          name,
          email,
          password: hashedPassword,
        })
        return {
          token: sign({ userId: user.id, role: user.role }, APP_SECRET),
          user,
          isAdmin: false
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.prisma.user({ email })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id, role: user.role }, APP_SECRET),
          user,
          isAdmin: user.role === 1
        }
      },
    })

    t.field('createUserVote', {
      type: 'UserVote',
      args: {
        candidateId: idArg({required: true}),
        voteType: 'VoteType'
      },
      resolve: async (parent, {candidateId, voteType}, ctx) => {
        const userId = getUserId(ctx)
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
        candidate_positionId: idArg({required: true}),
        like: 'LikeType'
      },
      resolve: async (parent, {candidate_positionId, like}, ctx) => {
        const userId = getUserId(ctx)
        let userPositionLike = await ctx.prisma.userPositionLikes({
          where: { AND: [{userId}, {candidate_position: {id: candidate_positionId}}] }
        })
        if (userPositionLike.length === 0) {
          return ctx.prisma.createUserPositionLike({
            userId,
            candidate_position: {connect: {id: candidate_positionId}},
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
        qualificationId: idArg({required: true}),
        like: 'LikeType'
      },
      resolve: async (parent, {qualificationId, like}, ctx) => {
        const userId = getUserId(ctx)
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
        candidateId: idArg({required: true}),
        pollType: 'PollType'
      },
      resolve: async (parent, {candidateId, pollType}, ctx) => {
        const userId = getUserId(ctx)
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

    t.field('createCandidate', {
      type: 'Candidate',
      args: {
        name: stringArg({required: true}),
        age: intArg(),
        party: stringArg({required: true}),
        state: stringArg({required: true}),
        gender: "Gender",
        current_office: stringArg({required: true}),
        bio_other: stringArg(),
        file: 'Upload'
      },
      resolve: async (parent, args, ctx) => {
        let uploadURL = ''
        if (args.file) {
          const { createReadStream , filename } = await args.file
          const stream = createReadStream()
          const key = uuid() + '-' + filename
          const response = await s3.upload({
              Key: key,
              ACL: 'public-read',
              Body: stream 
            }).promise()
          uploadURL = response.Location
        }
        const candidate = await ctx.prisma.createCandidate({
          name: args.name,
          state: args.state,
          party: args.party,
          age: args.age,
          gender: args.gender,
          current_office: args.current_office,
          photo: uploadURL,
          bio_other: args.bio_other
        })
        return candidate
      }
    })

    t.field('updateCandidate', {
      type: 'Candidate',
      args: {
        id: idArg({required: true}),
        name: stringArg({required: true}),
        age: intArg(),
        party: stringArg({required: true}),
        state: stringArg({required: true}),
        gender: "Gender",
        current_office: stringArg({required: true}),
        bio_other: stringArg(),
        file: 'Upload'
      },
      resolve: async (parent, args, ctx) => {
        let uploadURL = ''
        if (args.file) {
          const { createReadStream , filename } = await args.file
          const stream = createReadStream()
          const key = uuid() + '-' + filename
          const response = await s3.upload({
              Key: key,
              ACL: 'public-read',
              Body: stream 
            }).promise()
          uploadURL = response.Location
        }
        const candidate = await ctx.prisma.updateCandidate({
          where: { id: args.id },
          data: {
            name: args.name,
            state: args.state,
            party: args.party,
            age: args.age,
            gender: args.gender,
            current_office: args.current_office,
            photo: uploadURL,
            bio_other: args.bio_other
          }
        })
        return candidate
      }
    })
  },
})

export default Mutation