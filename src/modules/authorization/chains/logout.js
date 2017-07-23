import { state } from 'cerebral/tags'
import { wait, set } from 'cerebral/operators'
import { goTo } from '@cerebral/router/operators'
import { removeStorage } from '@cerebral/storage/operators'

export default [
  set(state`authorization.loggingOut`, true),
  wait(400),
  set(state`authorization.callsign`, null),
  set(state`authorization.error`, null),
  set(state`authorization.pending`, false),
  set(state`authorization.token`, null),
  set(state`user.data`, null),
  set(state`events.eventsData`, null),
  set(state`events.eventData`, null),
  set(state`app.sidebarActive`, false),
  set(state`app.sidebarView`, null),
  set(state`app.sidebarPreviousView`, null),
  set(state`app.sidebarTitle`, null),
  set(state`app.sidebarIcon`, null),
  removeStorage('authorization.authenticated'),
  removeStorage('authorization.callsign'),
  removeStorage('authorization.token'),
  removeStorage('user'),
  removeStorage('games'),
  removeStorage('events'),
  set(state`authorization.authenticated`, false),
  goTo('/login'),
  wait(600),
  set(state`authorization.loggingOut`, false),
]
