const UpdateProfile = ({ props, state, http, forms }) => {
  state.set(`${props.form}.pending`, true)
  const fields = forms.toJSON(props.form)
  return http.put(`/users/${state.get('user.id')}/info`, fields)
    .then(response => {
      state.merge('user', response.result)
      state.set(`${props.form}.pending`, false)
      forms.reset(props.form)
    }).catch(rawError => {
      const error = JSON.stringify(rawError)
      state.set(`${props.form}.error`, JSON.parse(error))
      state.set(`${props.form}.pending`, false)
    })
}

export default UpdateProfile
