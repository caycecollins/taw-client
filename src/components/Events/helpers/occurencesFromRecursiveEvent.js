import moment from 'moment-timezone'
import { RRule } from 'rrule'

const isExcluded = (date, excludedDates) => {
  var excluded, i
  i = 0
  while (i < excludedDates.length) {
    excluded = excludedDates[i]
    if (date.isSame(excluded)) {
      return true
    }
    i++
  }
  return false
}

const occurencesFromRecursiveEvent = props => {
  const allEvents = []
  props.events.forEach(event => {
    if (event.recurring.length > 0) {
      const adjustedRecurringArray = event.recurring
        .map(weekday => {
          const wkd = weekday === 0 ? weekday + 6 : weekday - 1
          return wkd
        })
        .sort()
      const occurrences = new RRule({
        freq: RRule.WEEKLY,
        wkst: RRule.SU,
        interval: 1,
        byweekday: adjustedRecurringArray,
        dtstart: moment(event.start).tz(props.userTimezone).toDate(),
        until: moment(event.end).tz(props.userTimezone).toDate(),
      })
      occurrences.all().forEach(occurrence => {
        if (!isExcluded(event.start, event.excludedDates)) {
          const eventObject = {
            id: event.id,
            start: moment(occurrence).toDate(),
            end: moment.tz(occurrence, props.userTimezone).add(event.duration, 'm').toDate(),
            title: event.title,
            mandatory: event.mandatory,
            recurring: true,
          }
          allEvents.push(eventObject)
        }
      })
    } else {
      const eventObject = {
        id: event.id,
        start: moment(event.start).tz(props.userTimezone).toDate(),
        end: moment(event.end).tz(props.userTimezone).toDate(),
        mandatory: event.mandatory,
        title: event.title,
      }
      allEvents.push(eventObject)
    }
  })
  return allEvents
}

export default occurencesFromRecursiveEvent
