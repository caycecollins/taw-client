import { set, wait } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import apiGet from '../../factories/apiGet'
import changeView from '../../factories/changeView'
import changeSidebarView from '../../factories/changeSidebarView'

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
          apiGet('/events', 'events'), {
            success: [
              changeView('events'),
              wait(2000),
              changeSidebarView({ view: 'viewEvent', icon: 'calendar-o', title: state`event.title` }),
            ],
            error: [],
          },
        ],
        error: changeView('fourohfour'),
      },
    ],
    opened: [
      getEvent, {
        success: [
          set(state`event`, props`result`),
          changeSidebarView({ view: 'viewEvent', icon: 'calendar-o', title: props`result.title` }),
        ],
        error: set(state`event`, { error: props`result` }),
      },
    ],
    creating: [
      () => { console.log('event.creating') },
    ],
    created: [
      () => { console.log('event.created') },
    ],
    deleted: [
      () => { console.log('event.deleted') },
    ],
    reporting: [
      () => { console.log('event.reporting') },
    ],
  },
}
