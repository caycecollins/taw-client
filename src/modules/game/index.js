import { Module } from 'cerebral'

import authenticate from '../../factories/authenticate'

import gameRouted from './signals/gameRouted'
import gameTabChanged from './signals/gameTabChanged'

export default Module({
  state: {
    tab: 'info',
  },
  signals: {
    routed: authenticate(gameRouted),
    gameTabChanged,
  },
})
