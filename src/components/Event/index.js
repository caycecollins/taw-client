import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import moment from 'moment'
import { rgba } from 'polished'

function EventModal (props) {
  return (
    <EventContainer>
      {props.event &&
        Object.keys(props.event).map((key, index) => {
          const val = props.event[key].toString()
          return (
            <div key={index}>
              {key}: {val}
            </div>
          )
        })
      }
    </EventContainer>
  )
}

EventModal.propTypes = {
  event: PropTypes.object,
}

EventModal.defaultProps = {
  event: {},
}

export default connect(
  {
    event: state`event`,
  },
  EventModal
)

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
