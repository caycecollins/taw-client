import authenticate from '../../factories/authenticate'
import changeView from '../../factories/changeView'

const getUser = async ({ path, http, state, storage }) => {
  // const userFromLocalStorage = storage.get('user')
  const tokenFromLocalStorage = storage.get('authorization.token')
  if (!tokenFromLocalStorage) {
    return path.redirected()
  }
  // if (userFromLocalStorage && userFromLocalStorage.callsign) {
  //   state.set('user', userFromLocalStorage)
  // } else {
  //   const getUserDataFromApi = await http.get('/users/me')
  //   state.set('user', getUserDataFromApi.result)
  //   storage.set('user', getUserDataFromApi.result)
  // }
  const getUserDataFromApi = await http.get('/users/me')
  state.set('user', getUserDataFromApi.result)
  storage.set('user', getUserDataFromApi.result)
  return path.continue()
}

export default {
  state: null,
  signals: {
    getUser: [
      authenticate([
        getUser, {
          redirected: [
            changeView('login'),
          ],
          continue: [],
        },
      ]),
    ],
  },
}
