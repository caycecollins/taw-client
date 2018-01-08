import { Module } from 'cerebral'

import authenticate from '../../factories/authenticate'
import changeView from '../../factories/changeView'

export default Module({
  state: {
  },
  signals: {
    routed: authenticate(changeView('notifications')),
  },
})
