import { Module } from 'cerebral'

import authenticate from '../authorization/signals/authenticate'

import loginRouted from './signals/loginRouted'

export default Module({
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
})
