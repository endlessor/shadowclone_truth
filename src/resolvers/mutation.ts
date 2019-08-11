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
      'createCandidatePosition',
      'createTopic',
      'deleteCandidatePosition',
      'deleteTopic',
      'updateCandidatePosition',
      'updatePosition',
      'updateQualification',
      'updateTopic'
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
        if (voteType === 'TOP') {
          await ctx.prisma.deleteManyUserVotes({
            userId: userId, vote_type: voteType
          })
        }
        if (userVote.length === 0) {
          return ctx.prisma.createUserVote({
            userId,
            candidateId,
            vote_type: voteType})
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
        candidateId: idArg({required: true}),
        positionId: idArg({required: true}),
        like: 'LikeType'
      },
      resolve: async (parent, {candidateId, positionId, like}, ctx) => {
        const userId = getUserId(ctx)
        let userPositionLike = await ctx.prisma.userPositionLikes({
          where: { userId, candidateId, positionId }
        })
        if (userPositionLike.length === 0) {
          return ctx.prisma.createUserPositionLike({
            userId,
            candidateId,
            positionId,
            like
          })
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
            like
          })
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
        bio_summary: stringArg(),
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
          bio_summary: args.bio_summary
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
        bio_summary: stringArg(),
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
            bio_summary: args.bio_summary
          }
        })
        return candidate
      }
    })

    t.field('deleteCandidate', {
      type: 'Candidate',
      args: {
        id: idArg({required: true}),
      },
      resolve: async (parent, args, ctx) => {
        const candidate = await ctx.prisma.candidate({ id: args.id })
        if (candidate.photo) {
          const arrTemp = candidate.photo.split('/')
          const key = arrTemp[arrTemp.length - 1]
          s3.deleteObject({
            Bucket: process.env.S3BUCKET,
            Key: key
          }, function(err, data) {
            if (err) console.log(err)
          })
        }
        await ctx.prisma.deleteManyQualifications({ candidateId: args.id})
        await ctx.prisma.deleteManyCandidatePositions({ candidateId: args.id })
        await ctx.prisma.deleteManyUserVotes({ candidateId: args.id})
        return ctx.prisma.deleteCandidate({ id: args.id })
      }
    })

    t.field('deletePosition', {
      type: 'Position',
      args: {
        id: idArg({required: true}),
      },
      resolve: async (parent, args, ctx) => {
        await ctx.prisma.deleteManyCandidatePositions({ positionId: args.id })
        await ctx.prisma.deleteManyUserPositionLikes({ positionId: args.id })
        return ctx.prisma.deletePosition({ id: args.id })
      }
    })

    t.field('deleteQualification', {
      type: 'Qualification',
      args: {
        id: idArg({required: true}),
      },
      resolve: async (parent, args, ctx) => {
        await ctx.prisma.deleteManyUserQualificationLikes({ qualificationId: args.id })
        return ctx.prisma.deleteQualification({ id: args.id })
      }
    })
  },
})

export default Mutation