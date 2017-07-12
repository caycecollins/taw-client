import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import apiGet from '../../factories/apiGet'
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
      apiGet('/events', 'events'), {
        success: [
          getEvent, {
            success: [
              set(state`event`, props`result`),
              changeView('events'),
            ],
            error: changeView('fourohfour'),
          },
        ],
        error: changeView('fourohfour'),
      },
    ],
  },
}
