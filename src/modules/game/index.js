import authenticate from '../../factories/authenticate'

import gameRouted from './signals/gameRouted'
import gameViewChanged from './signals/gameViewChanged'

export default {
  state: {
    view: 'info',
  },
  signals: {
    routed: authenticate(gameRouted),
    gameViewChanged,
  },
}
