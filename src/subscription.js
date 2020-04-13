import { PubSub } from 'apollo-server'
import { TWEET_EVENTS } from './tweets'
import { USER_EVENTS } from './users'

export const EVENTS = {
  TWEET: TWEET_EVENTS,
  USER: USER_EVENTS,
}

export default new PubSub()
