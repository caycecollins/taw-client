import { Controller } from 'cerebral'
import config from 'config'

import root from './modules/root'

import Devtools from 'cerebral/devtools'

const controller = Controller(root, {
  devtools:
    config.cerebral && config.cerebral.debugger
      ? Devtools({
        host: config.cerebral.remote || null,
        bigComponentsWarning: 15,
      })
      : null,
})

export default controller
