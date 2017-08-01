import { when, set, wait } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import resetSidebarState from '../../../factories/resetSidebarState'

export default [
  set(state`app.sidebarActive`, props`value`),
  when(props`value`), {
    true: [],
    false: [
      wait(450),
      resetSidebarState(),
      ({ state, router }) => router.goTo(`/${state.get('app.currentView')}`),
    ],
  },
]
