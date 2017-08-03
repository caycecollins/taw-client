import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'

const DeleteEventModal = props =>
  <Container>
    Are you sure you want to delete the event:&nbsp;<strong>{props.event.title}</strong>&nbsp;?
  </Container>

DeleteEventModal.propTypes = {
  event: PropTypes.object,
}

export default connect(
  {
    event: state`events.eventData`,
  },
  DeleteEventModal
)

const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  color: ${props => props.theme.colors.armyWhite};
`
