import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'
import { Grid, Row, Col } from 'react-material-responsive-grid'

import ViewContainer from '../ViewContainer'

import Modules from './Modules'

const Dashboard = props =>
  <ViewContainer>
    <Greeting>
      Welcome back <Callsign>{props.user.callsign}</Callsign>.
    </Greeting>
    <Modules />
  </ViewContainer>

Dashboard.propTypes = {
  user: PropTypes.object,
}

export default connect(
  {
    user: state`user`,
  },
  Dashboard
)

const Greeting = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.lightTan};
  margin-bottom: 48px;
`

const Callsign = styled.span`
  color: ${props => props.theme.colors.armyWhite}
`
