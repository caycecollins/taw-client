import { Module } from 'cerebral'

import authenticate from '../../factories/authenticate'
import resetForm from '../../factories/resetForm'

import calculateCalendarView from './helpers/calculateCalendarView'
import scheduleEventForm from './forms/scheduleEventForm'
import reportEventForm from './forms/reportEventForm'
import editEventForm from './forms/editEventForm'
import eventsRouted from './signals/eventsRouted'
import calendarViewChanged from './signals/calendarViewChanged'
import viewEventRouted from './signals/viewEventRouted'
import scheduleEventRouted from './signals/scheduleEventRouted'
import scheduleEventReset from './signals/scheduleEventReset'
import scheduleEventSubmitted from './signals/scheduleEventSubmitted'
import searchParticipantsChanged from './signals/searchParticipantsChanged'
import addParticipantClicked from './signals/addParticipantClicked'
import removeParticipantClicked from './signals/removeParticipantClicked'
import reportEventRouted from './signals/reportEventRouted'
import reportEventSubmitted from './signals/reportEventSubmitted'
import editEventReset from './signals/editEventReset'
import editEventSubmitted from './signals/editEventSubmitted'
import deleteEventClicked from './signals/deleteEventClicked'
import deleteEventConfirmed from './signals/deleteEventConfirmed'

export default Module({
  state: {
    calendarView: calculateCalendarView(),
    calendarViewArmyTime: {
      defaultValue: null,
    },
    data: null,
    scheduleEventForm,
    reportEventForm,
    editEventForm,
  },
  signals: {
    routed: authenticate(eventsRouted),
    calendarViewChanged,
    viewEventRouted: authenticate(viewEventRouted),
    scheduleEventRouted: authenticate(scheduleEventRouted),
    scheduleEventReset: resetForm(scheduleEventReset),
    scheduleEventSubmitted,
    editEventReset: resetForm(editEventReset),
    editEventSubmitted,
    deleteEventClicked,
    deleteEventConfirmed,
    searchParticipantsChanged,
    addParticipantClicked,
    removeParticipantClicked,
    reportEventRouted: authenticate(reportEventRouted),
    reportEventSubmitted,
  },
})
