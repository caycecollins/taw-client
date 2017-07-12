export default function ({ state, http, storage, router }) {
  state.set('authorization.pending', true)
  const callsign = state.get('login.form.callsign.value')
  state.set('authorization.callsign', callsign)
  const password = state.get('login.form.password.value')
  console.log(`attempting login with username: ${callsign}`)
  return http.post('/auth/login', {
    callsign,
    password,
  }).then(async rawResponse => {
    const stringifyResponse = JSON.stringify(rawResponse)
    const response = JSON.parse(stringifyResponse)
    state.set('login.form.callsign.value', '')
    state.set('login.form.password.value', '')
    state.set('authorization.error', null)
    state.set('authorization.token', response.result.token)
    state.set('authorization.authenticated', true)
    state.set('app.initialDrawerAnimation', true)
    storage.set('authorization.token', response.result.token)
    storage.set('authorization.callsign', state.get('authorization.callsign'))
    http.updateOptions({
      headers: {
        'Authorization': `Bearer ${response.result.token}`,
      },
    })
    const getMe = await http.get('/users/me')
    state.set('user', getMe.result)
    router.goTo('/')
    state.set('authorization.pending', false)
  }).catch(rawError => {
    state.set('login.form.password.value', '')
    const error = JSON.stringify(rawError)
    state.set('authorization.error', JSON.parse(error))
    state.set('authorization.pending', false)
  })
}
