import { Controller } from 'cerebral'
import Devtools from 'cerebral/devtools'
import HttpProvider from '@cerebral/http'
import FormsProvider from '@cerebral/forms'
import StorageProvider from '@cerebral/storage'
import config from 'config'

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
import reports from './modules/reports'
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
    search: {
      results: [],
    },
    units: {},
  },
  modules: {
    storage: StorageProvider({ target: window.localStorage }),
    router,
    app,
    authorization,
    // signup,
    login,
    profile,
    notifications,
    dashboard,
    events,
    games,
    game,
    reports,
    fourohfour,
  },
  providers: [
    HttpProvider({
      baseUrl: `${config.api.protocol}://${config.api.host}:${config.api.port}/${config.api.baseUrl}`,
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
  ],
})

export default controller
