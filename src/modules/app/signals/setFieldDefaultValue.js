import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

export default [
  set(state`${props`field`}.defaultValue`, props`value`),
]
