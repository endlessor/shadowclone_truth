import { ApolloServer } from 'apollo-server'
import { prisma } from '../generated/prisma-client'
import schema from './schema'

const server = new ApolloServer({
  schema,
  context: { prisma },
})

server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`),
)