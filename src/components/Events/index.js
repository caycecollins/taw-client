import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import { CSSTransitionGroup } from 'react-transition-group'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { rgba } from 'polished'

import ViewContainer from '../ViewContainer'
import Link from '../Link'

BigCalendar.momentLocalizer(moment)

function Events (props) {
  return (
    <ViewContainer>
      <CSSTransitionGroup
        transitionName="initial"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
        component="span"
      >
        <EventsContainer>
          <BigCalendar
            events={props.events}
            startAccessor="start"
            endAccessor="end"
            popup={true}
            selectable={true}

          />
        </EventsContainer>
      </CSSTransitionGroup>
    </ViewContainer>
  )
}

Events.propTypes = {
  events: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  event: PropTypes.object,
}

export default connect(
  {
    events: state`events`,
    event: state`event`,
  },
  Events
)

const EventsContainer = styled.div`
  padding: 24px;
  height: 100%;
  .rbc-toolbar {
    margin-bottom: 24px;
    padding: 0;
    button {
        height: 33px;
        padding: 8px 16px;
        margin: 0 8px;
        border-radius: 2px;
        border: 1px solid ${props => props.theme.colors.armyGreen};
        background-color: transparent;
        color: ${props => props.theme.colors.armyGreen};
        font-size: .7rem;
        text-transform: uppercase;
        transition: all .3s ease-in-out;
        &:hover {
          &:not(.rbc-active) {
            background-color: rgba(0,0,0,.3);
            cursor: pointer;
            color: ${props => props.theme.colors.armyWhite};
            border: 1px solid ${props => props.theme.colors.greenWhite};
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
