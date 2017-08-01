import { set, wait } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

export default [
  wait(200),
  set(state`app.sidebarReset`, props`sidebarReset`),
  set(state`app.sidebarSubmit`, props`sidebarSubmit`),
]
