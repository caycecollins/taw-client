import authenticate from '../../factories/authenticate'
import apiGet from '../../factories/apiGet'
import changeView from '../../factories/changeView'

export default {
  state: {
    filterInput: {
      value: '',
    },
  },
  signals: {
    routed: [
      authenticate([
        changeView('games'),
        apiGet('/games/gameDivisions', 'games.data'), {
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
