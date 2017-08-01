import authenticate from './signals/authenticate'
import logout from './signals/logout'

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
