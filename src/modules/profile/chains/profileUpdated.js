const UpdateProfile = ({ state, http, forms }) => {
  state.set('profile.updating', true)
  const fields = forms.toJSON('profile.editForm')
  return http.put(`/users/${state.get('user.id')}/info`, fields)
    .then(response => {
      state.merge('user', response.result)
      state.set('profile.updating', false)
      forms.reset('profile.editForm')
    }).catch(rawError => {
      const error = JSON.stringify(rawError)
      state.set('profile.updatError', JSON.parse(error))
      state.set('profile.updating', false)
    })
}

export default UpdateProfile
