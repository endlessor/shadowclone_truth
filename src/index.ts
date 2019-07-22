import { ApolloServer } from 'apollo-server-express'
import { prisma } from '../generated/prisma-client'
import schema from './schema'
import express = require('express')
import path = require('path')
import bodyParser = require('body-parser')

require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', express.static(path.join(path.dirname(__dirname), '/client/build')));

const server = new ApolloServer({
  schema,
  context: { prisma },
})

server.applyMiddleware({ app });

const port = process.env.SERVER_PORT || 4000

app.listen({ port: port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
