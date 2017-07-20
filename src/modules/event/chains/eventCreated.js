import { merge } from 'lodash'

const UpdateProfile = ({ state, http, forms }) => {
  state.set('event.creating', true)
  let fields = forms.toJSON('event.scheduleEventForm')
  console.log(fields)
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
