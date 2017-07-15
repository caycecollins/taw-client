import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import moment from 'moment-timezone'

function EventModal (props) {
  const tableData = [
    ['title', props.event.title || 'Loading...'],
    ['start', moment.tz(props.event.start, props.userTimezone).format('ddd, MMM Do YYYY @ HHmm (h:mm a) z')],
    ['end', moment.tz(props.event.end, props.userTimezone).format('ddd, MMM Do YYYY @ HHmm (h:mm a) z')],
    ['duration', props.event.duration / 60 + 'hr(s)'],
    ['type', props.event.type],
    ['description', props.event.description],
    ['mandatory', props.event.mandatory && 'Yes'],
    ['repeats', props.event.recurring.length > 0 && 'Yes (will calculate daysOfWeek later)'],
    ['created by', props.event.creatorCallsign],
  ]

  return (
    <EventContainer>
      <Section>
        Details
        <br />
        <br />
        <table>
          <tbody>
            {tableData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item[0].toUpperCase()}</td>
                  <td>{item[1]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Section>
    </EventContainer>
  )
}

EventModal.propTypes = {
  event: PropTypes.object,
  userTimezone: PropTypes.string,
}

EventModal.defaultProps = {
  event: {},
}

export default connect(
  {
    event: state`event.data`,
    userTimezone: state`user.timezone`,
  },
  EventModal
)

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`

const Section = styled.div`
  margin-bottom: 24px;
  > table {
    tbody {
      tr {
        td {
          vertical-align: top;
          padding: 8px;
          &:first-of-type {
            padding-right: 24px;
            font-size: 0.95rem;
          }
        }
      }
    }
  }
`
