import { goTo } from '@cerebral/router/operators'

import changeView from '../../factories/changeView'
import isLoggedIn from '../../factories/isLoggedIn'

export default {
  state: {
    form: {
      callsign: {
        value: '',
        isRequired: true,
        validationRules: [
          'minLength:3',
          'isValue',
        ],
      },
      password: {
        type: 'password',
        value: '',
        isRequired: true,
        validationRules: [
          'minLength:6',
          'isValue',
        ],
      },
      showErrors: true,
    },
  },
  signals: {
    routed: [
      isLoggedIn(), {
        true: goTo('/'),
        false: changeView('login'),
      },
    ],
  },
}
