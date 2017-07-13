import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import changeView from '../../factories/changeView'

const getEvent = ({ path, http, props }) => {
  return http.get(`/events/${props.id}`)
    .then(path.success)
    .catch(path.error)
}

export default {
  state: {
  },
  signals: {
    routed: [
      getEvent, {
        success: [
          set(state`event`, props`result`),
        ],
        error: changeView('fourohfour'),
      },
    ],
    selected: [
      getEvent, {
        success: [
          set(state`event`, props`result`),
        ],
        error: set(state`event`, { error: props`result` }),
      },
    ],
  },
}
