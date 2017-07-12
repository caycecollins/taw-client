import { set } from 'cerebral/operators'
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
    routeFailed: false,
  },
  signals: {
    authenticate,
    logout: [
      set(state`authorization.authenticated`, false),
      set(state`authorization.callsign`, null),
      set(state`authorization.error`, null),
      set(state`authorization.pending`, false),
      set(state`authorization.token`, null),
      set(state`user`, null),
      removeStorage('authorization.authenticated'),
      removeStorage('authorization.callsign'),
      removeStorage('authorization.token'),
      removeStorage('user'),
      goTo('/login'),
    ],
  },
}
