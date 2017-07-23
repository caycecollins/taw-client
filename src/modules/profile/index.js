import { state } from 'cerebral/tags'

import authenticate from '../../factories/authenticate'
import changeView from '../../factories/changeView'
import changeSidebarView from '../../factories/changeSidebarView'

import profileUpdated from './chains/profileUpdated.js'

export default {
  state: {
    profileUpdated: {
      timezone: {
        type: 'select',
        value: '',
        isRequired: true,
        isPristine: true,
        validationRules: [
          'isValue',
        ],
      },
      showErrors: true,
      pending: false,
    },
  },
  signals: {
    routed: [
      authenticate(changeView('profile')),
    ],
    opened: [
      authenticate([
        changeSidebarView({ view: 'viewProfile', tab: 'general', title: state`user.callsign` }),
      ]),
    ],
    profileUpdated,
    deleted: [
      () => { console.log('profile.deleted') },
    ],
  },
}
