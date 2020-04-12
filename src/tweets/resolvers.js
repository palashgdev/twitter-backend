import Tweet from './tweet'
import pubsub, { EVENTS } from '../subscription'

const resolvers = {
  Query: {
    tweet: async (_, { id }, {}) => await Tweet.findOne({ _id: id }),
    userTweets: async (_, { userId }, {}) => await Tweet.find({ userId }),
    comments: async (_, { tweetId }, {}) =>
      await Tweet.find({ isComment: true, commentedOn: tweetId }),
  },
  Mutation: {
    createTweet: async (_, { tweet }, {}) => {
      const newTweet = await Tweet.create(tweet)

      pubsub.publish(EVENTS.TWEET.CREATED, {
        tweetCreated: { tweet: newTweet },
      })

      return newTweet
    },
  },
}

export default resolvers
