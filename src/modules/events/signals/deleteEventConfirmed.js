import { set, wait } from 'cerebral/operators'
import { state, props, string } from 'cerebral/tags'
import { goTo } from '@cerebral/router/operators'

import modalActiveToggled from '../../app/signals/modalActiveToggled'
import resetSidebarState from '../../../factories/resetSidebarState'
import deleteEvent from '../actions/deleteEvent'

export default [
  set(state`app.modalActionPending`, true),
  deleteEvent, {
    success: [
      wait(500),
      modalActiveToggled,
      set(state`app.modalActionPending`, false),
      resetSidebarState(),
      goTo(string`/${state`app.currentView`}`),
    ],
    error: [
      set(state`app.modalError`, props`error`),
    ],
  },
]
