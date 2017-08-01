import { wait, when } from 'cerebral/operators'
import { state } from 'cerebral/tags'

import apiGet from '../../../factories/apiGet'
import changeView from '../../../factories/changeView'
import calculateCalendarView from '../helpers/calculateCalendarView'

const getEvents = [
  apiGet('/events', 'events.eventsData'), {
    success: ({ state }) => state.set('events.calendarView', calculateCalendarView()),
    error: [
      changeView('fourohfour'),
    ],
  },
]

export default [
  when(state`app.initialAnimation`), {
    true: [
      wait(400),
      changeView('events'),
      wait(800),
      getEvents,
    ],
    false: [
      changeView('events'),
      wait(250),
      getEvents,
    ],
  },
]
