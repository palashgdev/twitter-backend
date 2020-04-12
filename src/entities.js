import { gql } from 'apollo-server'
import users from './users'
import tweets from './tweets'
import common from './common'

const typeDef = gql`
  type Query
  type Mutation
`

export const resolvers = [users.resolvers, tweets.resolvers]
export const typeDefs = [
  typeDef,
  common.typeDef,
  users.typeDef,
  tweets.typeDef,
]
