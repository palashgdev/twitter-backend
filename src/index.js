import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'

import { resolvers, typeDefs } from './entities'

const { PORT, MONGODB_URI, ACCESS_TOKEN_SECRET } = process.env
const port = PORT || 4000

let isConnected
const connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection')
    return Promise.resolve()
  }
  console.log('=> using new database connection')
  return mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
    })
    .then(db => {
      isConnected = db.connections[0].readyState
    })
}

const app = express()
app.use(cors())
app.use(cookieParser())
app.use((req, res, next) => {
  connectToDatabase()
    .then(() => next())
    .catch(error => {
      throw error
    })
})

const getMe = async req => {
  const token = req.cookies?.accessToken

  if (token) {
    try {
      return await jwt.verify(token, ACCESS_TOKEN_SECRET)
    } catch (error) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res, connection }) => {
    if (req) {
      const me = await getMe(req)

      return { res, me, secret: ACCESS_TOKEN_SECRET }
    }
  },
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

server.applyMiddleware({ app, cors: false })

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)
