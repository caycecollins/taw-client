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
        changeView('games'),
        apiGet('/games', 'games.data'), {
          success: [
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
