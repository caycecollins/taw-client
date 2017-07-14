import { set, wait, when } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import apiGet from '../../factories/apiGet'
import changeView from '../../factories/changeView'
import changeSidebarView from '../../factories/changeSidebarView'

const getEvent = ({ state, path, http, props }) => {
  if (!state.get('authorization.authenticated')) return path.error()
  return http.get(`/events/${props.id}`)
    .then(path.success)
    .catch(path.error)
}

export default {
  state: {
  },
  signals: {
    routed: [
      () => { console.log('event.routed') },
      getEvent, {
        success: [
          set(state`event`, props`result`),
          apiGet('/events', 'events'), {
            success: [
              changeView('events'),
              when(state`app.previousView`), {
                true: [],
                false: wait(2000),
              },
              changeSidebarView({ view: 'viewEvent', icon: 'calendar-o', title: state`event.title` }),
            ],
            error: set(state`event`, { error: props`result` }),
          },
        ],
        error: changeView('fourohfour'),
      },
    ],
    opened: [
      () => { console.log('event.opened') },
      ({ router, props }) => router.goTo(`/events/${props.id}`),
      getEvent, {
        success: [
          changeSidebarView({ view: 'viewEvent', icon: 'calendar-o', title: props`result.title` }),
          set(state`event`, props`result`),
        ],
        error: set(state`event`, { error: props`result` }),
      },
    ],
    createRouted: [
      () => { console.log('event.createRouted') },
      apiGet('/events', 'events'), {
        success: [
          changeView('events'),
          wait(2000),
          changeSidebarView({ view: 'createEvent', icon: 'calendar-plus-o', title: 'Create New Event' }),
        ],
        error: set(state`event`, { error: props`result` }),
      },
    ],
    creating: [
      () => { console.log('event.creating') },
      changeSidebarView({ view: 'createEvent', icon: 'calendar-plus-o', title: 'Create New Event' }),
    ],
    created: [
      () => { console.log('event.created') },
    ],
    deleted: [
      () => { console.log('event.deleted') },
    ],
    reportRouted: [
      () => { console.log('event.createRouted') },
      apiGet('/events', 'events'), {
        success: [
          changeView('events'),
          wait(2000),
          changeSidebarView({ view: 'reportEvent', icon: 'calendar-check-o', title: 'Report an Event' }),
        ],
        error: set(state`event`, { error: props`result` }),
      },
    ],
    reporting: [
      () => { console.log('event.reporting') },
      changeSidebarView({ view: 'reportEvent', icon: 'calendar-check-o', title: 'Report an Event' }),
    ],
  },
}
