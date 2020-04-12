import { gql } from 'apollo-server-express'

const typeDef = gql`
  scalar JSON
  scalar Date
`

export default typeDef
