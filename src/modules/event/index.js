import { set, wait } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import apiGet from '../../factories/apiGet'
import changeView from '../../factories/changeView'
import changeSidebarView from '../../factories/changeSidebarView'

import eventRouted from './chains/eventRouted'
import eventCreateRouted from './chains/eventCreateRouted'
import eventCreated from './chains/eventCreated'
import filterInviteInput from './chains/filterInviteInput'

export default {
  state: {
    createEventForm: {
      title: {
        value: '',
        isRequired: true,
        isPristine: true,
        validationRules: [
          'isValue',
        ],
      },
      description: {
        value: '',
        isRequired: true,
        isPristine: true,
        validationRules: [
          'isValue',
        ],
      },
      mandatory: {
        value: '',
        isRequired: false,
        isPristine: true,
        validationRules: [],
      },
      start: {
        value: '',
        isRequired: true,
        isPristine: true,
        validationRules: [
          'isValue',
        ],
      },
      end: {
        value: '',
        isRequired: true,
        isPristine: true,
        validationRules: [
          'isValue',
        ],
      },
      repeat: {
        value: '',
        isRequired: false,
        isPristine: true,
        validationRules: [],
      },
      repeatWeekly: {
        value: '',
        isRequired: false,
        isPristine: true,
        validationRules: [],
      },
      searchDivision: {
        value: '',
        isRequired: false,
        isPristine: true,
        validationRules: [],
      },
      showErrors: true,
      pending: false,
    },
  },
  signals: {
    routed: eventRouted,
    createRouted: eventCreateRouted,
    createEventFormSubmitted: eventCreated,
    filterInviteInput,
    deleted: [
      () => { console.log('event.deleted') },
    ],
    reportRouted: [
      apiGet('/events', 'events.data'), {
        success: [
          changeView('events'),
          wait(2000),
          changeSidebarView({ view: 'reportEvent', icon: 'calendar-check-o', title: 'Report an Event' }),
        ],
        error: set(state`event.data`, props`result`),
      },
    ],
    reporting: [
      changeSidebarView({ view: 'reportEvent', icon: 'calendar-check-o', title: 'Report an Event' }),
    ],
  },
}
