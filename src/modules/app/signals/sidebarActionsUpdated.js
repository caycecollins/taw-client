import { set, wait } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

export default [
  wait(200),
  set(state`app.sidebarFormPath`, props`sidebarFormPath`),
  set(state`app.sidebarSubmitSignal`, props`sidebarSubmitSignal`),
]
