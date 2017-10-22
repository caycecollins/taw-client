import authenticate from '../../factories/authenticate'

import gameRouted from './signals/gameRouted'
import gameTabChanged from './signals/gameTabChanged'

export default {
  state: {
    tab: 'info',
  },
  signals: {
    routed: authenticate(gameRouted),
    gameTabChanged,
  },
}
