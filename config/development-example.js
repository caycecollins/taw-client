/**
 * development-example.js
 *
 * Sample configuration.  Rename to development.js and edit.
 */

import common from './common'

export default Object.assign({}, common, {
  cerebral: {
    debugger: true,
    // remote: 'localhost:8585', // Uncomment this to use the cerebral remote debugger, otherwise you can use the chrome extension
  },
})
