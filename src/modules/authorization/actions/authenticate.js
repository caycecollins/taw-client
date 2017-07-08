// import R from 'ramda'
// import Auth0 from 'auth0-js'

export default function ({ state }) {
  // const auth0 = new Auth0.WebAuth({
  //   domain: state.get('config.auth0.domain'),
  //   clientID: state.get('config.auth0.clientID'),
  //   responseType: 'token',
  //   scope: 'openid profile',
  // })
  // return new Promise((resolve, reject) => {
  //   const payload = {
  //     realm: 'Username-Password-Authentication',
  //     username: state.get('authorization.username'),
  //     password: state.get('authorization.password'),
  //   }
  //   if (!payload.username) {
  //     return reject({ type: 'UsernameNotSpecifiedError' })
  //   }
  //   if (!payload.password) {
  //     return reject({ type: 'PasswordNotSpecifiedError' })
  //   }
  //   auth0.client.login(payload, (error, result) => {
  //     if (error) return reject(error)
  //     resolve(result)
  //   })
  // }).then(result => {
  //   state.set('authorization.password', '')
  //   state.set('authorization.error', null)
  //   state.set('authorization.token', result.idToken)
  //   state.set('authorization.authenticated', true)
  // }).catch(error => {
  //   state.set('authorization.error', R.omit(['original'], error))
  // })
}
