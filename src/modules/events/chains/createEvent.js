import moment from 'moment'
// import { merge } from 'lodash'

const getRecurringInfo = weekly => {
  const daysOfWeek = []
  if (weekly.sun && weekly.sun.value) daysOfWeek.push(0)
  if (weekly.mon && weekly.mon.value) daysOfWeek.push(1)
  if (weekly.tue && weekly.tue.value) daysOfWeek.push(2)
  if (weekly.wed && weekly.wed.value) daysOfWeek.push(3)
  if (weekly.thu && weekly.thu.value) daysOfWeek.push(4)
  if (weekly.fri && weekly.fri.value) daysOfWeek.push(5)
  if (weekly.sat && weekly.sat.value) daysOfWeek.push(6)
  return daysOfWeek
}

const CreateEvent = ({ props, state, http, forms }) => {
  state.set(`${props.form}.pending`, true)
  state.unset(`${props.form}.error`)
  const form = forms.get(props.form)
  const difference = moment(form.end.value).diff(moment(form.start.value))
  const duration = moment.duration(difference).minutes()
  const recurring = form.repeat.value ? getRecurringInfo(form.repeatWeekly) : []
  const participants = state.get(`${props.form}.participants`)
  const formToSend = {
    title: form.title.value,
    description: form.description.value,
    mandatory: form.mandatory.value || false,
    start: form.start.value,
    startTime: moment(form.start.value).format('hh:mm'),
    end: form.end.value,
    type: 'Meeting',
    duration,
    recurring,
    participants: participants && participants.length > 0 ? participants : ['none'],
    unit: { id: parseInt(form.unit.value) },
  }
  console.log(formToSend)
  // setTimeout(() => {
  //   state.set(`${props.form}.pending`, false)
  //   state.set(`${props.form}.error`, { status: 500, name: 'not working yet' })
  // }, 1000)
  return http.post(`/events`, formToSend)
    .then(response => {
      console.log(response)
      // state.merge('user', response.result)
      setTimeout(() => state.set(`${props.form}.pending`, false), 500)
      setTimeout(() => forms.reset(props.form), 500)
    }).catch(rawError => {
      const error = JSON.stringify(rawError)
      console.log(JSON.parse(error))
      setTimeout(() => state.set(`${props.form}.pending`, false), 500)
      setTimeout(() => state.set(`${props.form}.error`, JSON.parse(error)), 500)
    })
}

export default CreateEvent
