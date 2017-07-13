import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import changeView from '../../factories/changeView'

const getGame = ({ path, http, props }) => {
  return http.get(`/units/${props.id}`)
    .then(path.success)
    .catch(path.error)
}

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
