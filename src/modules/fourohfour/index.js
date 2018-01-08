import { Module } from 'cerebral'

import changeView from '../../factories/changeView'

export default Module({
  state: {
  },
  signals: {
    routed: changeView('fourohfour'),
  },
})
