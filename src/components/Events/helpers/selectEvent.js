import moment from 'moment-timezone'

const selectEvent = (event, props) => {
  if (!event.recurring) return props.eventSelected({ id: event.id.toString() })
  return props.eventSelected({
    id: event.id.toString(),
    s: moment.tz(event.start, props.userTimezone).unix(),
    e: moment.tz(event.end, props.userTimezone).unix(),
  })
}

export default selectEvent
