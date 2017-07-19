/**
 * production-example.js
 *
 * Sample configuration.  Rename to production.js and edit.
 */

import { merge } from 'lodash'

import common from './common'

export default merge(common, {
  cerebral: {
    debugger: false,
  },
})
