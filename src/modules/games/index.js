import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import changeView from '../../factories/changeView'

const getGames = ({ path, http, props }) => {
  return http.get(`/games`)
    .then(path.success)
    .catch(path.error)
}

export default {
  state: {
  },
  signals: {
    routed: [
      getGames, {
        success: [
          set(state`games`, props`result`),
          changeView('games'),
        ],
        error: changeView('fourohfour'),
      },
    ],
  },
}
