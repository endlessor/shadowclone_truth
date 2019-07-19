import { ApolloServer } from 'apollo-server'
import { prisma } from '../generated/prisma-client'
import schema from './schema'
require('dotenv').config()

const server = new ApolloServer({
  schema,
  context: { prisma },
})

const port = process.env.SERVER_PORT || 4000

server.listen({ port: port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`),
)