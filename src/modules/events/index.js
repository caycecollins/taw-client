import authenticate from '../../factories/authenticate'

import calculateCalendarView from './helpers/calculateCalendarView'
import scheduleEventForm from './forms/scheduleEventForm'
import eventsRouted from './signals/eventsRouted'
import calendarViewChanged from './signals/calendarViewChanged'
import viewEventRouted from './signals/viewEventRouted'
import scheduleEventRouted from './signals/scheduleEventRouted'
import scheduleEventSubmitted from './signals/scheduleEventSubmitted'
import searchParticipantsChanged from './signals/searchParticipantsChanged'
import addParticipantClicked from './signals/addParticipantClicked'
import removeParticipantClicked from './signals/removeParticipantClicked'
import reportEventRouted from './signals/reportEventRouted'
import reportEventSubmitted from './signals/reportEventSubmitted'

export default {
  state: {
    calendarView: calculateCalendarView(),
    data: null,
    scheduleEventForm,
  },
  signals: {
    routed: authenticate(eventsRouted),
    calendarViewChanged,
    viewEventRouted: authenticate(viewEventRouted),
    scheduleEventRouted: authenticate(scheduleEventRouted),
    scheduleEventSubmitted,
    searchParticipantsChanged,
    addParticipantClicked,
    removeParticipantClicked,
    reportEventRouted: authenticate(reportEventRouted),
    reportEventSubmitted,
  },
}
