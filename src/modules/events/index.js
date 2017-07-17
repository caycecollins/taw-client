import { parallel } from 'cerebral'
import { wait, when, debounce, set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { setStorage } from '@cerebral/storage/operators'

import apiGet from '../../factories/apiGet'
import changeView from '../../factories/changeView'

const calculateCalendarView = window.innerWidth > 768 ? JSON.parse(window.localStorage.getItem('events.calendarView')) || 'month' : 'agenda'
const getEvents = [
  apiGet('/events', 'events.data'), {
    success: [
      set(state`events.calendarView`, calculateCalendarView),
    ],
    error: [
      changeView('fourohfour'),
    ],
  },
]

export default {
  state: {
    calendarView: calculateCalendarView,
    data: null,
  },
  signals: {
    routed: [
      when(state`app.initialDrawerAnimation`), {
        true: [
          changeView('empty'),
          wait(300),
          changeView('events'),
          wait(600),
          getEvents,
        ],
        false: [
          changeView('events'),
          wait(300),
          getEvents,
        ],
      },
    ],
    calendarViewChanged: parallel([
      setStorage('events.calendarView', props`view`),
      set(state`events.calendarView`, props`view`),
    ]),
    calendarMobileUpdated: [
      debounce(500), {
        continue: [
          set(state`events.calendarMobile`, props`isMobile`),
          set(state`events.calendarView`, props`view`),
          setStorage('events.calendarView', props`view`),
        ],
        discard: [],
      },
    ],
  },
}
