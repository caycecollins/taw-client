import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import moment from 'moment'
import { rgba } from 'polished'

const ReportEvent = props =>
  <ReportEventContainer>
    Report Event
  </ReportEventContainer>

ReportEvent.propTypes = {
}

export default connect(
  {
  },
  ReportEvent
)

const ReportEventContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
