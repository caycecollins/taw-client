import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import setParticipants from '../actions/setParticipants'

export default [
  set(state`${props`form`}.participants`, []),
  set(state`search.results`, []),
  setParticipants,
  set(state`${props`form`}.participants`, props`participants`),
]
