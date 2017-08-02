import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import BigCalendar from 'react-big-calendar'
import moment from 'moment-timezone'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { CSSTransitionGroup } from 'react-transition-group'
import { RRule } from 'rrule'

import ViewContainer from '../ViewContainer'
import Button from '../Button'

BigCalendar.momentLocalizer(moment)

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
      console.log(event.recurring)
      const adjustedRecurringArray = event.recurring
        .map(weekday => {
          const wkd = weekday === 0 ? weekday + 6 : weekday - 1
          return wkd
        })
        .sort()
      console.log(adjustedRecurringArray)
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
        title: event.title,
      }
      allEvents.push(eventObject)
    }
  })
  return allEvents
}

const selectEvent = (event, props) => {
  if (!event.recurring) return props.eventSelected({ id: event.id.toString() })
  return props.eventSelected({
    id: event.id.toString(),
    s: moment.tz(event.start, props.userTimezone).unix(),
    e: moment.tz(event.end, props.userTimezone).unix(),
  })
}

const Events = props =>
  <ViewContainer>
    <EventsContainer>
      <CustomActions>
        <Button
          onClick={() => props.reportEvent()}
          icon="calendar-check-o"
          label="Report Event"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={() => props.scheduleEvent()}
          icon="calendar-plus-o"
          label="Create New Event"
        />
      </CustomActions>
      <CSSTransitionGroup
        transitionName="view"
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        component="span"
      >
        <BigCalendar
          key="bigcal"
          events={props.events ? occurencesFromRecursiveEvent(props) : []}
          startAccessor="start"
          endAccessor="end"
          popup={true}
          // selectable={true}
          onSelectEvent={event => selectEvent(event, props)}
          onView={(view) => props.calendarViewChanged({ view })}
          view={props.calendarView}
          defaultView={props.calendarView}
          toolbar={!props.deviceSize !== 'mobile'}
        />
      </CSSTransitionGroup>
      <br />
    </EventsContainer>
  </ViewContainer>

Events.propTypes = {
  authenticated: PropTypes.bool,
  deviceSize: PropTypes.string,
  events: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  calendarView: PropTypes.string,
  calendarViewChanged: PropTypes.func,
  event: PropTypes.object,
  eventSelected: PropTypes.func,
  scheduleEvent: PropTypes.func,
  reportEvent: PropTypes.func,
  userTimezone: PropTypes.string,
}

Events.defaultProps = {
  events: [],
}

export default connect(
  {
    authenticated: state`authorization.authenticated`,
    deviceSize: state`app.deviceSize`,
    events: state`events.eventsData`,
    calendarView: state`events.calendarView`,
    event: state`events.eventData`,
    calendarViewChanged: signal`events.calendarViewChanged`,
    eventSelected: signal`events.viewEventRouted`,
    scheduleEvent: signal`events.scheduleEventRouted`,
    reportEvent: signal`events.reportEventRouted`,
    userTimezone: state`user.timezone`,
  },
  Events
)

const EventsContainerResponsive = css`
@media (max-width: 767px) {
  .rbc-agenda-content {
    font-size: 0.8rem;
  }
}
`

const CustomActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 24px;
`

const EventsContainer = styled.div`
  height: 100%;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  > span {
    width: 100%;
    height: 100%;
  }
  .rbc-agenda-view {
    flex: 1;
    table {
      border: 1px solid transparent;
    }
  }
  .rbc-toolbar {
    margin-bottom: 24px;
    padding: 0;
    button {
      height: 29px;
      padding: 4px 14px;
      margin: 0 8px;
      border-radius: 2px;
      border: 1px solid ${props => props.theme.colors.armyGreen};
      background-color: transparent;
      color: ${props => props.theme.colors.armyGreen};
      font-size: .7rem;
      text-transform: uppercase;
      transition: all .3s ease-in-out;
      box-shadow: none;
      &:hover {
        &:not(.rbc-active) {
          background-color: rgba(0,0,0,.3);
          cursor: pointer;
          color: ${props => props.theme.colors.armyWhite};
        }
      }
      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        margin-right: 0;
      }
      &.rbc-active {
        background-color: transparent;
        color: ${props => props.theme.colors.armyWhite};
        border: 1px solid transparent;
      }
    }
  }
  .rbc-header {
    padding: 10px 4px;
    font-weight: normal;
    background-color: ${props => rgba(props.theme.colors.darkGray6, 0.6)};
    border-bottom: 1px solid ${props => rgba(props.theme.colors.gray, 0.6)};
  }
  .rbc-month-view, .rbc-time-view {
    border: 1px solid ${props => rgba(props.theme.colors.gray, 0.6)};
  }
  .rbc-month-row + .rbc-month-row, .rbc-day-slot .rbc-time-slot {
    border-top: 1px solid ${props => rgba(props.theme.colors.gray, 0.6)};
  }
  .rbc-timeslot-group {
    border-bottom: 1px solid ${props => rgba(props.theme.colors.gray, 0.6)};
  }
  .rbc-month-view .rbc-header + .rbc-header, .rbc-day-bg + .rbc-day-bg, .rbc-time-header > .rbc-row > * + *, .rbc-time-content > * + * > * {
    border-left: 1px solid ${props => rgba(props.theme.colors.gray, 0.6)};
  }
  .rbc-current-time-indicator {
    background-color: ${props => props.theme.colors.armyGreen};
    height: 2px;
    &::before {
      background-color: ${props => props.theme.colors.armyGreen};
    }
  }
  .rbc-time-slot.rbc-label {
    font-size: 0.8rem;
  }
  .rbc-today:not(.rbc-day-slot) {
    background-color: ${props => rgba(props.theme.colors.armyWhite, 0.1)};
  }
  .rbc-time-view .rbc-header.rbc-today, .rbc-today.rbc-day-slot {
    background-color: ${props => rgba(props.theme.colors.armyWhite, 0.1)};
  }
  .rbc-date-cell {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    color: ${props => props.theme.colors.armyGreen};
    font-size: 0.8rem;
    > a {
      margin: -1px -1px 0 0;
      padding: 3px 7px 2px 7px;
      border: 1px solid ${props => rgba(props.theme.colors.gray, 0.6)};
    }
    &.rbc-off-range {
      color: ${props => rgba(props.theme.colors.armyGreen, 0.4)};
      > a {
        border: 1px solid ${props => rgba(props.theme.colors.gray, 0.4)};
      }
    }
  }
  .rbc-event {
    background-color: ${props => rgba(props.theme.colors.armyGreen, 0.6)};
    .rbc-event-content {
      font-size: 0.8rem;
    }
  }
  .rbc-selected-cell {
    background-color: ${props => rgba(props.theme.colors.lightRed, 0.2)};
  }

  ${EventsContainerResponsive}

`
