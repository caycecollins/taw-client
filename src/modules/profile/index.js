import changeView from '../../factories/changeView'

export default {
  state: {
  },
  signals: {
    routed: changeView('profile'),
  },
}
