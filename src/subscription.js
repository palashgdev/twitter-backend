import { PubSub } from 'apollo-server'
import { TWEET_EVENTS } from './tweets'

export const EVENTS = {
  TWEET: TWEET_EVENTS,
}

export default new PubSub()
