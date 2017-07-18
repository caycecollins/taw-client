import { parallel } from 'cerebral'
import { wait, when, debounce, set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { setStorage } from '@cerebral/storage/operators'

import authenticate from '../../factories/authenticate'
import apiGet from '../../factories/apiGet'
import changeView from '../../factories/changeView'

function calculateCalendarView () {
  return window.innerWidth > 768
    ? JSON.parse(window.localStorage.getItem('events.calendarView')) || 'month'
    : 'agenda'
}

const getEvents = [
  apiGet('/events', 'events.data'), {
    success: ({ state }) => state.set('events.calendarView', calculateCalendarView()),
    error: [
      changeView('fourohfour'),
    ],
  },
]

export default {
  state: {
    calendarView: calculateCalendarView(),
    data: null,
  },
  signals: {
    routed: [
      authenticate([
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
      ]),
    ],
    calendarViewChanged: parallel([
      setStorage('events.calendarView', props`view`),
      set(state`events.calendarView`, props`view`),
    ]),
    calendarMobileUpdated: [
      debounce(200), {
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
