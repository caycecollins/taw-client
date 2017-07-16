import { Controller } from 'cerebral'
import Devtools from 'cerebral/devtools'
import HttpProvider from '@cerebral/http'
import FormsProvider from '@cerebral/forms'
import StorageProvider from '@cerebral/storage'
import { ContextProvider } from 'cerebral/providers'
import config from 'config'
import uuid from 'uuid'

import router from './router'
import app from './modules/app'
import authorization from './modules/authorization'
// import signup from './modules/signup'
import login from './modules/login'
import dashboard from './modules/dashboard'
import profile from './modules/profile'
import notifications from './modules/notifications'
import games from './modules/games'
import game from './modules/game'
import events from './modules/events'
import event from './modules/event'
import reports from './modules/reports'
import user from './modules/user'
import fourohfour from './modules/fourohfour'

const localStorageToken = window.localStorage.getItem('authorization.token')
const jwtToken = localStorageToken
  ? JSON.parse(localStorageToken)
  : null

const controller = Controller({
  devtools: config.cerebral && config.cerebral.debugger
    ? Devtools({ host: config.cerebral.remote || null, bigComponentsWarning: 15 })
    : null,
  state: {
    config,
  },
  modules: {
    router,
    app,
    authorization,
    // signup,
    login,
    profile,
    notifications,
    dashboard,
    events,
    event,
    games,
    game,
    reports,
    user,
    fourohfour,
  },
  providers: [
    HttpProvider({
      baseUrl: `${window.location.protocol}//${window.location.hostname}:6100/api`,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      withCredentials: true, // true if CORS is required
    }),
    FormsProvider({
      errorMessages: {
        minLength (value, minLength) {
          return `${minLength} characters minimum.`
        },
        isEmail (value) {
          return `${value} is not a valid email`
        },
        equalsField (value, field) {
          return `Not equal to ${field}`
        },
      },
    }),
    StorageProvider({ target: window.localStorage }),
    ContextProvider({ uuid }),
  ],
})

export default controller
