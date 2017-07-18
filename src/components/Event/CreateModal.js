import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import moment from 'moment-timezone'
import { rgba } from 'polished'

const CreateNewEvent = props =>
  <CreateNewEventContainer>
    Create Event
    <br />
    <br />
    <br />

  </CreateNewEventContainer>

CreateNewEvent.propTypes = {
}

export default connect(
  {
  },
  CreateNewEvent
)

const CreateNewEventContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
