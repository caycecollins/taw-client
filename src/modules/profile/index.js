import authenticate from '../../factories/authenticate'

import profileRouted from './signals/profileRouted'
import profileTabChanged from './signals/profileTabChanged'
import editProfileClicked from './signals/editProfileClicked'
import editProfileSubmitted from './signals/editProfileSubmitted'

export default {
  state: {
    tab: 'info',
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
    routed: authenticate(profileRouted),
    profileTabChanged,
    editProfileClicked,
    editProfileSubmitted,
  },
}
