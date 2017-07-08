import { Controller } from 'cerebral'

import config from '../../config/test'

/**
 * Provide global helpers to the test runner.  Anything added here must be also added
 * to the eslint globals.
 */
Object.assign(global, {
  config,
  runChain: (chain, value, state = {}) => {
    return new Promise((resolve, reject) => {
      const controller = Controller({
        state,
        signals: {
          test: chain,
        },
      })
      controller.runTree.on('end', () => {
        try {
          resolve(controller.getState())
        } catch (e) {
          reject(e)
        }
      })
      controller.getSignal('test')(value)
    })
  },
  runAction: (action, state = {}) => {
    return runChain([action], {}, state)
  },
})
