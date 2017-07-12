import authenticate from '../../factories/authenticate'
import changeView from '../../factories/changeView'

export default {
  state: {
  },
  signals: {
    routed: [
      authenticate(changeView('profile')),
    ],
  },
}
