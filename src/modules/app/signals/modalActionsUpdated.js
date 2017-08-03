import { set, wait } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

export default [
  wait(200),
  set(state`app.modalConfirmSignal`, props`modalConfirmSignal`),
]
