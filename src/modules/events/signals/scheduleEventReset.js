import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

export default [
  set(state`${props`form`}.participants`, []),
  set(state`search.results`, []),
]
