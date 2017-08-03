import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'
import moment from 'moment-timezone'

import selectEvent from '../helpers/selectEvent'

const isMandatory = (events, eventID) => {
  const event = events.filter(event => event.id === eventID)
  return event[0].mandatory
}

const MonthEvent = props => {
  const startDate = moment(props.event.start).tz(props.userTimezone)
  const meridiem = startDate.format('a').charAt(0)
  const startTime = !props.calendarViewArmyTime.value ? startDate.format('h') + meridiem : startDate.format('HHmm')
  return (
    <Container
      onClick={e => selectEvent(props.event, props)}
    >
      <TypeIndicator
        mandatory={isMandatory(props.events, props.event.id)}
      />
      <StartTime>{startTime}</StartTime>
      <Title>{props.event.title}</Title>
    </Container>
  )
}

export default connect(
  {
    events: state`events.eventsData`,
    userTimezone: state`user.timezone`,
    userHourFormat: state`user.hourformat`,
    calendarViewArmyTime: state`events.calendarViewArmyTime`,
    eventSelected: signal`events.viewEventRouted`,
  },
  MonthEvent
)

MonthEvent.propTypes = {
  events: PropTypes.array,
  userTimezone: PropTypes.string,
  userHourFormat: PropTypes.number,
  calendarViewArmyTime: PropTypes.object,
  eventSelected: PropTypes.func,
  event: PropTypes.object,
  children: PropTypes.node,
}

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  overflow: hidden;
  margin-right: 4px;
  padding: 3px 0;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
    background-color: rgba(0,0,0,0.5);
  }
`

const TypeIndicator = styled.div`
  width: 1px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  background-color: ${props => props.mandatory ? props.theme.colors.lightRed : props.theme.colors.gray};
  border-radius: 50%;
  margin: 0 8px;
`

const StartTime = styled.div`
  margin-top: -2px;
  margin-right: 4px;
  font-size: 0.7rem;
`

const Title = styled.div`
  margin-top: -3px;
  white-space: nowrap;
`
