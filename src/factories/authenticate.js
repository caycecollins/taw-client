import { when } from 'cerebral/operators'
import { goTo } from '@cerebral/router/operators'
import { state } from 'cerebral/tags'

const getCurrentUserData = async ({ http, state }) => {
  const getUserDataFromApi = await http.get('/users/me')
  state.set('user', getUserDataFromApi.result)
}

export default (continueSequence = []) => {
  return [
    when(state`authorization.authenticated`), {
      true: [
        when(state`user.callsign`), {
          true: [],
          false: [
            getCurrentUserData,
          ],
        },
        continueSequence,
      ],
      false: [
        goTo('/login'),
      ],
    },
  ]
}
