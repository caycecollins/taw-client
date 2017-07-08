/**
 * production-example.js
 *
 * Sample configuration.  Rename to production.js and edit.
 */

import common from './common'

export default Object.assign({}, common, {
  cerebral: {
    debugger: false,
  },
})
