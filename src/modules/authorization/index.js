import setUsername from './chains/setUsername'
import setPassword from './chains/setPassword'
import authenticate from './chains/authenticate'

export default {
  state: {
    username: '',
    password: '',
    pending: false,
    authenticated: false,
    error: null,
    token: null,
  },
  signals: {
    usernameChanged: setUsername,
    passwordChanged: setPassword,
    authenticationRequested: authenticate,
  },
}
