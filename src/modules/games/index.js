// import { pop, wait, shift, splice,  set } from 'cerebral/operators'
// import { state, props } from 'cerebral/tags'

import apiGet from '../../factories/apiGet'
import changeView from '../../factories/changeView'

// const getGames = ({ path, http, props }) => {
//   return http.get(`/games`)
//     .then(path.success)
//     .catch(path.error)
// }

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
      apiGet('/games', 'games.data'), {
        success: [
          // (result) => { console.log(result) },
          // set(state`games`, props`result`),
          changeView('games'),
        ],
        error: [
          // (result) => { console.log(result.props.error) },
          changeView('fourohfour'),
        ],
      },
    ],
    toggleGames: [
      // set(state`games.toggle`, props`value`),
    ],
  },
}
