// import { merge } from 'lodash'

const UpdateProfile = ({ props, state, http, forms }) => {
  // let fields = forms.toJSON(props.form)
  // console.log(fields)
  state.set(`${props.form}.pending`, true)
  setTimeout(() => {
    state.set(`${props.form}.pending`, false)
    state.set(`${props.form}.underConstruction`, true)
  }, 2000)
  // return http.post(`/events`, fields)
  //   .then(response => {
  //     // state.merge('user', response.result)
  //     console.log(response)
  //     state.set('event.creating', false)
  //     forms.reset('event.scheduleEventForm')
  //   }).catch(rawError => {
  //     const error = JSON.stringify(rawError)
  //     state.set('event.createError', JSON.parse(error))
  //     state.set('event.creating', false)
  //   })
}

export default UpdateProfile
