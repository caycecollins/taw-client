import authenticate from './chains/authenticate'
import logout from './chains/logout'

const localStorageToken = window.localStorage.getItem('authorization.token')
const jwtToken = localStorageToken
  ? JSON.parse(localStorageToken)
  : null

export default {
  state: {
    pending: false,
    authenticated: !!jwtToken || false,
    error: null,
    token: jwtToken || null,
    callsign: null,
  },
  signals: {
    authenticate,
    logout,
  },
}
