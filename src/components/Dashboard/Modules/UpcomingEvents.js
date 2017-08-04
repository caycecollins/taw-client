import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'
import moment from 'moment-timezone'
import { sortBy } from 'lodash'

import Icon from '../../Icon'
import Button from '../../Button'
import selectEvent from '../../Events/helpers/selectEvent'
import occurencesFromRecursiveEvent from '../../Events/helpers/occurencesFromRecursiveEvent'

const UpcomingEvents = props => {
  console.log(props.events)
  const ocurrences = props.events && occurencesFromRecursiveEvent(props)
  console.log(ocurrences)
  const sortByDate = sortBy(ocurrences, ['start'])
  const events = sortByDate.slice(0, 5)
  // console.log(events)
  return (
    <Container>
      <Legend>
        <LegendItem>
          <Circle color="lightRed" />
          <Name color="lightRed">Mandatory</Name>
        </LegendItem>
        <LegendItem>
          <Circle color="lightBlue" />
          <Name color="lightBlue">Optional</Name>
        </LegendItem>
        {/* <LegendItem>
          <Circle color="darkGray7" />
          <Name color="darkGray7">Other</Name>
        </LegendItem> */}
      </Legend>
      <Upcoming>
        <VertLine />
        {events.filter(event => moment(event.start).unix() > moment().unix()).map((event, index) => {
          const endTime = moment(event.end).format('HH:mm')
          const dateTime = `${moment(event.start).format('MMM Do, YYYY @ HH:mm - ')}${endTime}`
          return (
            <Event
              key={index}
              onClick={e => selectEvent(event, props)}
            >
              <IconCircle mandatory={event.mandatory}>
                <Icon
                  name="calendar"
                  size={15}
                />
              </IconCircle>
              <Info>
                <DateTime>{dateTime}</DateTime>
                <Title>{event.title}</Title>
              </Info>
            </Event>
          )
        })}
      </Upcoming>
      <Button
        onClick={() => props.viewAllEvents()}
        icon="calendar"
        label="View All Events"
      />
    </Container>
  )
}

UpcomingEvents.propTypes = {
  user: PropTypes.object,
  events: PropTypes.array,
  userTimezone: PropTypes.string,
  viewAllEvents: PropTypes.func,
  selectEvent: PropTypes.func,
}

export default connect(
  {
    events: state`dashboard.upcomingEvents`,
    userTimezone: state`user.timezone`,
    viewAllEvents: signal`events.routed`,
    eventSelected: signal`events.viewEventRouted`,
  },
  UpcomingEvents
)

const Container = styled.div`
`

const Legend = styled.div`
  display: flex;
  align-items: center;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
`

const Circle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => props.theme.colors[props.color] || props.theme.colors.gray};
`

const Name = styled.div`
  text-transform: uppercase;
  font-size: 0.8rem;
  color: ${props => props.theme.colors[props.color] || props.theme.colors.gray};
`

const Upcoming = styled.div`
  position: relative;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
`

const VertLine = styled.div`
  position: absolute;
  top: 24px;
  left: 16px;
  width: 1px;
  height: 80%;
  background-color: ${props => props.theme.colors.darkGray7};
  z-index: 0;
`

const Event = styled.div`
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  margin-left: -16px;
  z-index: 1;
  padding: 16px;
  &:hover {
    background-color: ${props => props.theme.colors.darkGray2};
    cursor: pointer;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -4px;
  margin-left: 16px;
`

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${props => props.mandatory ? props.theme.colors.lightRed : props.theme.colors.lightBlue};
`

const DateTime = styled.div`
  font-size: 0.8rem;
`

const Title = styled.div`
  margin-top: 4px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.armyGreen};
`
