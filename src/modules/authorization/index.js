import { wait, set } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import { removeStorage } from '@cerebral/storage/operators'
import { goTo } from '@cerebral/router/operators'

import authenticate from './chains/authenticate'

const localStorageToken = window.localStorage.getItem('authorization.token')
const jwtToken = localStorageToken
  ? JSON.parse(localStorageToken)
  : null

export default {
  state: {
    pending: false,
    authenticated: !!jwtToken || false,
    error: null,
    token: jwtToken || null,
    callsign: null,
  },
  signals: {
    authenticate,
    logout: [
      set(state`authorization.loggingOut`, true),
      wait(400),
      set(state`authorization.callsign`, null),
      set(state`authorization.error`, null),
      set(state`authorization.pending`, false),
      set(state`authorization.token`, null),
      set(state`user.data`, null),
      set(state`events.data`, null),
      set(state`event.data`, null),
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
    ],
  },
}
