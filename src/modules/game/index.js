import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import changeView from '../../factories/changeView'

const getGame = ({ path, http, props }) => {
  return http.get(`/units/${props.id}`)
    .then(path.success)
    .catch(path.error)
}
  // state.set('game', { selected: game.result || null })
  // if (game && game.result) {
  //   return path.true()
  // } else {
  //   if (state.get('app.currentView') !== 'fourohfour') return path.false()
  // }
// }

export default {
  state: {
  },
  signals: {
    routed: [
      getGame, {
        success: [
          set(state`game`, props`result`),
          changeView('game'),
        ],
        error: changeView('fourohfour'),
      },
    ],
  },
}
