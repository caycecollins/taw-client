import { when, set, wait } from 'cerebral/operators'
import { state, props, string } from 'cerebral/tags'
import { goTo } from '@cerebral/router/operators'

import resetSidebarState from '../../../factories/resetSidebarState'

export default [
  set(state`app.sidebarActive`, props`value`),
  when(props`value`), {
    true: [],
    false: [
      wait(450),
      resetSidebarState(),
      goTo(string`/${state`app.currentView`}`),
    ],
  },
]
