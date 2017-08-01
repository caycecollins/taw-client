import { when, set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

export default [
  set(state`app.sidebarTab`, props`tab`),
  when(state`app.sidebarTab`), {
    true: [],
    false: [
      set(state`app.sidebarTab`, null),
    ],
  },
]
