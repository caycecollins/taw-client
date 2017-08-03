import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'

import selectEvent from '../helpers/selectEvent'

const MonthEvent = props => {
  if (!props.eventFromState) return null
  return (
    <EventItemContainer
      onClick={e => selectEvent(props.event, props)}
    >
      <EventTypeIndicator
        mandatory={props.eventFromState.mandatory}
      />
      <EventLabel>{props.event.title}</EventLabel>
    </EventItemContainer>
  )
}

export default connect(
  {
    eventFromState: state`events.eventData`,
    userTimezone: state`user.timezone`,
    eventSelected: signal`events.viewEventRouted`,
  },
  MonthEvent
)

MonthEvent.propTypes = {
  eventSelected: PropTypes.func,
  eventFromState: PropTypes.object,
  event: PropTypes.object,
  children: PropTypes.node,
}

const EventItemContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  overflow: hidden;
  margin-right: 4px;
  padding: 3px 0;
  &:hover {
    cursor: pointer;
    background-color: rgba(0,0,0,0.5);
  }
`

const EventTypeIndicator = styled.div`
  width: 11px;
  min-width: 11px;
  height: 11px;
  min-height: 11px;
  background-color: ${props => props.mandatory ? props.theme.colors.lightRed : props.theme.colors.gray};
  border-radius: 50%;
  margin: 0 8px;
`

const EventLabel = styled.div`
  margin-top: -2px;
  white-space: nowrap;
`
