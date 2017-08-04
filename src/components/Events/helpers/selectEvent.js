import moment from 'moment-timezone'

const selectEvent = (event, props) => {
  if (!event.recurring) return props.eventSelected({ id: event.id.toString() })
  return props.eventSelected({
    id: event.id.toString(),
    s: moment(event.start).unix(),
    e: moment(event.end).unix(),
  })
}

export default selectEvent
