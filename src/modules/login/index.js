import authenticate from '../authorization/signals/authenticate'

import loginRouted from './signals/loginRouted'

export default {
  state: {
    authForm: {
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
    routed: loginRouted,
    login: authenticate,
  },
}
