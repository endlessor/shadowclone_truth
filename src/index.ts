import { GraphQLServer } from 'graphql-yoga'
import { prisma } from '../generated/prisma-client'
import schema from './schema'
import express = require('express')
import path = require('path')
import { permissions } from './permissions'

require('dotenv').config()

const server = new GraphQLServer({
  schema,
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.express.use('/', express.static(path.join(path.dirname(__dirname), '/client/build')));

const port = process.env.SERVER_PORT || 4000

const opts = {
  endpoint: '/',
  port: port,
  tracing: true,
  playground: '/graphql',
}

server.start(opts, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);
