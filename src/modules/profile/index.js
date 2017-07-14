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
  signals: {
    routed: [
      authenticate(changeView('profile')),
    ],
    opened: [
      authenticate([
        () => { console.log('profile.opened') },
        when(state`user.callsign`), {
          true: [
            () => { console.log('user.callsign is true') },
            changeSidebarView({ view: 'viewProfile', icon: 'user', title: state`user.callsign` }),
          ],
          false: [
            () => { console.log('user.callsign is FALSE') },
            getProfile, {
              success: [
                set(state`user`, props`result`),
                changeSidebarView({ view: 'viewProfile', icon: 'user', title: state`user.callsign` }),
              ],
              error: set(state`user`, { error: props`result` }),
            },
          ],
        },
      ]),
    ],
    edited: [
      () => { console.log('profile.edited') },
    ],
    deleted: [
      () => { console.log('profile.deleted') },
    ],
  },
}
