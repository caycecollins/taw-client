export default function editProfile ({ props, state, http, forms }) {
  state.set(`${props.form}.pending`, true)
  let fields = forms.toJSON(props.form)
  return http.put(`/users/${state.get('user.id')}/info`, fields)
    .then(response => {
      state.merge('user', response.result)
      setTimeout(() => state.set(`${props.form}.pending`, false), 500)
      setTimeout(() => forms.reset(props.form), 500)
    }).catch(rawError => {
      const error = JSON.stringify(rawError)
      setTimeout(() => state.set(`${props.form}.pending`, false), 500)
      setTimeout(() => state.set(`${props.form}.error`, JSON.parse(error)), 500)
    })
}
