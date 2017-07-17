import { when, set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import authenticate from '../../factories/authenticate'
import changeView from '../../factories/changeView'
import changeSidebarView from '../../factories/changeSidebarView'

const getProfile = async ({ path, http, state, storage }) => {
  // const userFromLocalStorage = storage.get('user')
  const tokenFromLocalStorage = storage.get('authorization.token')
  if (!tokenFromLocalStorage) {
    return path.error()
  }
  const getUserDataFromApi = await http.get('/users/me')
  state.set('user', getUserDataFromApi.result)
  storage.set('user', getUserDataFromApi.result)
  return path.success()
}

export default {
  state: {
    editForm: {
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
    },
    updating: false,
  },
  signals: {
    routed: [
      authenticate(changeView('profile')),
    ],
    opened: [
      authenticate([
        when(state`user.callsign`), {
          true: [
            changeSidebarView({ view: 'viewProfile', tab: 'general', title: state`user.callsign` }),
          ],
          false: [
            getProfile, {
              success: [
                set(state`user`, props`result`),
                changeSidebarView({ view: 'viewProfile', tab: 'general', title: state`user.callsign` }),
              ],
              error: set(state`user`, { error: props`result` }),
            },
          ],
        },
      ]),
    ],
    updated: [
      () => { console.log('profile.edited') },
      // UpdateProfile,
    ],
    deleted: [
      () => { console.log('profile.deleted') },
    ],
  },
}

function UpdateProfile ({ state, http, storage, router, forms }) {
  state.set('profile.updating', true)
  const fields = forms.toJSON('profile.editForm')
  console.log(fields)
  return http.put(`/users/${state.get('user.id')}/info`, fields)
    .then(response => {
      // const stringifyResponse = JSON.stringify(rawResponse)
      // const response = JSON.parse(stringifyResponse)
      console.log(response)
      state.merge('user', response.result)
      state.set('profile.updating', false)
      forms.reset('profile.editForm')
    }).catch(rawError => {
      const error = JSON.stringify(rawError)
      state.set('profile.updatError', JSON.parse(error))
      state.set('profile.updating', false)
    })
}
