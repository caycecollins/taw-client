import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import moment from 'moment-timezone'

const eventInfo = props => [
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

const ViewEventSidebar = props =>
  <Container>
    <Section>
      Details
      <br />
      <br />
      <table>
        <tbody>
          {props.event && eventInfo(props).map((item, index) => {
            console.assert(item)
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
  </Container>

ViewEventSidebar.propTypes = {
  event: PropTypes.object,
  userTimezone: PropTypes.string,
}

ViewEventSidebar.defaultProps = {
}

export default connect(
  {
    event: state`events.eventData`,
    userTimezone: state`user.timezone`,
  },
  ViewEventSidebar
)

const Container = styled.div`
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
