import { when, set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

export default [
  when(props`tab`), {
    true: [
      set(state`app.sidebarTab`, props`tab`),
    ],
    false: [
      set(state`app.sidebarTab`, null),
    ],
  },
]
