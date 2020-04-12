import { gql } from 'apollo-server'

const typeDef = gql`
  input UserInput {
    id: ID
    name: String
    email: String
    handle: String
    password: String
  }

  type User {
    id: ID!
    name: String
    email: String
    handle: String
    password: String
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    signup(user: UserInput!): User
    login(email: String!, password: String!): User
    logout: Boolean
  }
`

export default typeDef
