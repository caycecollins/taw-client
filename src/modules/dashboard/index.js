import { Module } from 'cerebral'

import authenticate from '../../factories/authenticate'

import dashboardRouted from './signals/dashboardRouted'

export default Module({
  state: {
    unit: { value: null },
  },
  signals: {
    routed: authenticate(dashboardRouted),
  },
})
