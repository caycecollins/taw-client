import { state } from 'cerebral/tags'

import authenticate from '../../factories/authenticate'
import changeView from '../../factories/changeView'
import changeSidebarView from '../../factories/changeSidebarView'

import editProfileSubmitted from './signals/editProfileSubmitted'

export default {
  state: {
    editProfileForm: {
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
    editProfileClicked: [
      authenticate([
        changeSidebarView({ view: 'viewProfile', tab: 'general', title: state`user.callsign` }),
      ]),
    ],
    editProfileSubmitted,
    deleted: [
      () => { console.log('profile.deleted') },
    ],
  },
}
