import { gql } from 'apollo-server-express'

const typeDef = gql`
  scalar JSON
  scalar Date

  type Subscription {
    tweetCreated: TweetCreated!
    userLoggedIn: UserLoggedIn!
    userLoggedOut: Boolean
  }

  type TweetCreated {
    tweet: Tweet!
  }

  type UserLoggedIn {
    user: User!
  }
`

export default typeDef
