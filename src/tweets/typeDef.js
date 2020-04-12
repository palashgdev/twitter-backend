import { gql } from 'apollo-server-express'

const typeDef = gql`
  input TweetInput {
    id: ID
    content: String
    userId: ID
    isComment: Boolean
    commentedOn: ID
    createdAt: Date
    updatedAt: Date
  }

  type Tweet {
    id: ID!
    content: String
    userId: ID
    isComment: Boolean
    commentedOn: ID
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    userTweets(userId: ID!): [Tweet]
    comments(tweetId: ID!): [Tweet]
    tweets: [Tweet]
    tweet(id: ID!): Tweet
    findTweets(filter: JSON!): [Tweet]
  }

  extend type Mutation {
    createTweet(tweet: TweetInput!): Tweet
  }

  type Subscription {
    tweetCreated: TweetCreated!
  }

  type TweetCreated {
    tweet: Tweet!
  }
`

export default typeDef
