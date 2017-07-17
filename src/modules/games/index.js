import authenticate from '../../factories/authenticate'
import apiGet from '../../factories/apiGet'
import changeView from '../../factories/changeView'

export default {
  state: {
    toggle: true,
    form: {
      filterGamesTerm: {
        value: '',
        isRequired: false,
      },
    },
  },
  signals: {
    routed: [
      authenticate([
        apiGet('/games', 'games.data'), {
          success: [
            changeView('games'),
          ],
          error: [
            changeView('fourohfour'),
          ],
        },
      ]),
    ],
    toggleGames: [
    ],
  },
}
