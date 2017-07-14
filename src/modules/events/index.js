import { parallel } from 'cerebral'
import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { setStorage } from '@cerebral/storage/operators'

import apiGet from '../../factories/apiGet'
import changeView from '../../factories/changeView'

export default {
  state: {
    calendarView: 'month',
    data: null,
  },
  signals: {
    routed: [
      apiGet('/events', 'events.data'), {
        success: [
          changeView('events'),
          ({ state, storage }) => state.set('events.calendarView', storage.get('events.calendarView') || 'month'),
          // setStorage('events.calendarView', props`view`),
        ],
        error: [
          changeView('fourohfour'),
        ],
      },
    ],
    calendarViewChanged: parallel([
      setStorage('events.calendarView', props`view`),
      set(state`events.calendarView`, props`view`),
    ]),
  },
}
