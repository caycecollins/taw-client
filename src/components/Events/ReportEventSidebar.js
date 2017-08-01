import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'

const ReportEventSidebar = props =>
  <Container>
    Report Event
  </Container>

ReportEventSidebar.propTypes = {
}

export default connect(
  {
  },
  ReportEventSidebar
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
