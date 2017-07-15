import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import BigCalendar from 'react-big-calendar'
import moment from 'moment-timezone'
import { rgba } from 'polished'
import R from 'ramda'

import ViewContainer from '../ViewContainer'
import Button from '../Button'

BigCalendar.momentLocalizer(moment)

function updateDateProps (array, prop, toTimezone) {
  const lens = R.lens(R.prop(prop), R.assoc(prop))
  return array.map((obj, index) => {
    return R.set(lens, moment.tz(obj[prop], toTimezone).toDate(), obj)
  })
}

function Events (props) {
  function updateDates () {
    const updateStartDates = updateDateProps(props.events, 'start', props.userTimezone)
    return updateDateProps(updateStartDates, 'end', props.userTimezone)
  }
  const updatedDates = (props.events && props.authenticated) && updateDates()
  return (
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
            onClick={() => props.createNewEvent()}
            icon="calendar-plus-o"
            label="Create New Event"
          />
        </CustomActions>
        {props.calendarView && updatedDates &&
          <BigCalendar
            events={updatedDates}
            startAccessor="start"
            endAccessor="end"
            popup={true}
            selectable={true}
            onSelectEvent={event => props.eventSelected({ id: event.id.toString() })}
            onView={(view) => props.calendarViewChanged({ view })}
            defaultView={props.calendarView}
          />
        }
      </EventsContainer>
    </ViewContainer>
  )
}

Events.propTypes = {
  authenticated: PropTypes.bool,
  events: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  calendarView: PropTypes.string,
  calendarViewChanged: PropTypes.func,
  event: PropTypes.object,
  eventSelected: PropTypes.func,
  createNewEvent: PropTypes.func,
  reportEvent: PropTypes.func,
  userTimezone: PropTypes.string,
}

Events.defaultProps = {
  events: [],
}

export default connect(
  {
    authenticated: state`authorization.authenticated`,
    events: state`events.data`,
    calendarView: state`events.calendarView`,
    calendarViewChanged: signal`events.calendarViewChanged`,
    event: state`event.data`,
    eventSelected: signal`event.routed`,
    createNewEvent: signal`event.creating`,
    reportEvent: signal`event.reporting`,
    userTimezone: state`user.timezone`,
  },
  Events
)

const CustomActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 24px;
`

const EventsContainer = styled.div`
  padding: 24px;
  height: 100%;
  transition: all .3s cubic-bezier(.4,0,.2,1);
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
  .rbc-month-view, .rbc-time-view, .rbc-agenda-view table {
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

`
