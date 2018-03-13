import { merge } from 'lodash'

import common from './common'

export default merge(common, {
  production: true,
  cerebral: {
    debugger: false,
  },
})
