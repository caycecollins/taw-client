import authenticate from '../../factories/authenticate'

import dashboardRouted from './signals/dashboardRouted'

export default {
  state: {
  },
  signals: {
    routed: authenticate(dashboardRouted),
  },
}
