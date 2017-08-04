import authenticate from '../../factories/authenticate'

import profileRouted from './signals/profileRouted'
import profileViewChanged from './signals/profileViewChanged'
import editProfileClicked from './signals/editProfileClicked'
import editProfileSubmitted from './signals/editProfileSubmitted'

export default {
  state: {
    view: 'info',
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
    profileViewChanged,
    editProfileClicked,
    editProfileSubmitted,
  },
}
