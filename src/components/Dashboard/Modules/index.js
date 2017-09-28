import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'
import { Grid, Row, Col } from 'react-material-responsive-grid'

import UpcomingEvents from './UpcomingEvents'
import QuickEventActions from './QuickEventActions'
import QuickUnitActions from './QuickUnitActions'
import CustomizeModules from './CustomizeModules'

const modules = {
  upcomingEvents: {
    title: 'My Upcoming Events',
    component: UpcomingEvents,
  },
  quickEventActions: {
    title: 'Quick Event Actions',
    component: QuickEventActions,
  },
  quickUnitActions: {
    title: 'Quick Unit Actions',
    component: QuickUnitActions,
  },
  customizeModules: {
    title: 'Customize Your Modules',
    component: CustomizeModules,
  },
}

const Modules = props =>
  <Container>
    <Grid>
      <Row>
        {Object.keys(modules).map(mod => {
          const ModuleComponent = modules[mod].component
          return (
            <Col key={mod}>
              <Module>
                <Header>
                  <Title>{modules[mod].title}</Title>
                  <LineSeparator />
                </Header>
                <ModuleComponent />
              </Module>
            </Col>
          )
        })}
      </Row>
    </Grid>
  </Container>

Modules.propTypes = {
  user: PropTypes.object,
}

export default connect(
  {
    user: state`user`,
  },
  Modules
)

const Container = styled.div`
`

const Module = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 320px;
  min-height: 160px;
  margin-bottom: 80px;
  margin-right: 48px;
`

const Header = styled.div`
  margin-bottom: 24px;
`

const Title = styled.div`
  text-transform: uppercase;
  font-size: 1.1rem;
  white-space: nowrap;
  color: ${props => props.theme.colors.armyWhite}
`

const LineSeparator = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 8px;
  background-color: ${props => props.theme.colors.gray};
`
