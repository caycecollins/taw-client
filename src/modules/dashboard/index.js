import authenticate from '../../factories/authenticate'

import dashboardRouted from './signals/dashboardRouted'

export default {
  state: {
    unit: { value: null },
  },
  signals: {
    routed: authenticate(dashboardRouted),
  },
}
