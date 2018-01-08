import { Module } from 'cerebral'
import StorageProvider from '@cerebral/storage'
import config from 'config'

import app from '../app'
import router from '../../router'
import authorization from '../authorization'
// import signup from '../signup'
import login from '../login'
import dashboard from '../dashboard'
import profile from '../profile'
import notifications from '../notifications'
import games from '../games'
import game from '../game'
import events from '../events'
import reports from '../reports'
import fourohfour from '../fourohfour'

import { http, forms } from './providers'

export default Module({
  state: {
    config,
    search: {
      results: [],
    },
    units: {},
  },
  modules: {
    app,
    storage: StorageProvider({ target: window.localStorage }),
    router,
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
  providers: { http, forms },
})
