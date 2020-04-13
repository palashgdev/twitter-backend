import User from './user'
import { AuthenticationError, UserInputError } from 'apollo-server'
import { createAccessToken } from '../auth'
import pubsub, { EVENTS } from '../subscription'

const resolvers = {
  Query: {
    user: async (_, { id }, { dataSources }) =>
      await dataSources.usersDB.findById(id),
  },
  Mutation: {
    signup: async (_, { user }, { secret }) => await User.create(user),
    login: async (_, { email, password }, { secret, res }) => {
      const user = await User.findByLogin(email)

      if (!user) {
        throw new UserInputError('No user found with this login credentials.')
      }

      const isValid = await user.validatePassword(password)

      if (!isValid) {
        throw new AuthenticationError('Invalid password.')
      }
      const accessToken = await createAccessToken({
        user,
        secret,
        expiresIn: '30m',
      })
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
      })

      pubsub.publish(EVENTS.USER.LOGGED_IN, {
        userLoggedIn: { user },
      })

      return user
    },
    logout: async (_, {}, { res }) => {
      res.clearCookie('accessToken')

      pubsub.publish(EVENTS.USER.LOGGED_OUT, {
        userLoggedOut: true,
      })

      return true
    },
  },
}

export default resolvers
