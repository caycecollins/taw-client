import { parallel } from 'cerebral'
import { wait, when, debounce, set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { setStorage } from '@cerebral/storage/operators'

import authenticate from '../../factories/authenticate'
import apiGet from '../../factories/apiGet'
import changeView from '../../factories/changeView'
import changeSidebarView from '../../factories/changeSidebarView'

import eventRouted from './chains/eventRouted'
import eventsRouted from './chains/eventsRouted'
import eventCreateRouted from './chains/eventCreateRouted'
import createEvent from './chains/createEvent'
import filterSearchInput from './chains/filterSearchInput'
import createEventAddParticipant from './chains/createEventAddParticipant'
import createEventRemoveParticipant from './chains/createEventRemoveParticipant'
import calculateCalendarView from './helpers/calculateCalendarView'
import createEventForm from './forms/createEventForm'

export default {
  state: {
    calendarView: calculateCalendarView(),
    data: null,
    createEvent: createEventForm,
  },
  signals: {
    routed: eventsRouted,
    calendarViewChanged: parallel([
      setStorage('events.calendarView', props`view`),
      set(state`events.calendarView`, props`view`),
    ]),
    eventRouted,
    eventCreateRouted,
    createEvent,
    filterSearchInput,
    createEventAddParticipant,
    createEventRemoveParticipant,
    eventDeleted: [
      () => { console.log('event.deleted') },
    ],
    reportEventRouted: [
      apiGet('/events', 'events.data'), {
        success: [
          changeView('events'),
          wait(2000),
          changeSidebarView({ view: 'reportEvent', icon: 'calendar-check-o', title: 'Report an Event' }),
        ],
        error: set(state`event.data`, props`result`),
      },
    ],
    reportEventSubmitted: [
      changeSidebarView({ view: 'reportEvent', icon: 'calendar-check-o', title: 'Report an Event' }),
    ],
  },
}
