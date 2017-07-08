import { state, props } from 'cerebral/tags'
import { set } from 'cerebral/operators'

export default [
  set(state`authorization.username`, props`username`),
]
