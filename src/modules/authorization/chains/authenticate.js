import { state } from 'cerebral/tags'
import { set } from 'cerebral/operators'

import authenticate from '../actions/authenticate'

export default [
  set(state`authorization.pending`, true),
  authenticate,
  set(state`authorization.pending`, false),
]
