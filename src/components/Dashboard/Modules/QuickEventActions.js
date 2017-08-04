import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'

import Button from '../../Button'

const commonButtonProps = {
  iconMarginless: true,
  outline: false,
  removeLeftPadding: true,
  size: 'md',
}

const QuickEventActions = props =>
  <Container>
    <StyledButton
      icon="calendar-times-o"
      label="Submit Excusal"
      onClick={() => console.log('not available yet')}
      disabled
      {...commonButtonProps}
    />
    <StyledButton
      icon="calendar-plus-o"
      label="Schedule event"
      onClick={() => props.scheduleEvent()}
      {...commonButtonProps}
    />
    <StyledButton
      icon="calendar-check-o"
      label="Report Event"
      onClick={() => props.reportEvent()}
      {...commonButtonProps}
    />
    <StyledButton
      icon="list"
      label="Take Attendance"
      onClick={() => console.log('not available yet')}
      disabled
      {...commonButtonProps}
    />
  </Container>

QuickEventActions.propTypes = {
  user: PropTypes.object,
  scheduleEvent: PropTypes.func,
  reportEvent: PropTypes.func,
}

export default connect(
  {
    scheduleEvent: signal`events.scheduleEventRouted`,
    reportEvent: signal`events.reportEventRouted`,
  },
  QuickEventActions
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledButton = styled(Button)`
  &:hover {
    background-color: transparent;
  }
`
