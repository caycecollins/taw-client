import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled, { ThemeProvider as CerebralThemeProvider } from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'
import _ from 'lodash'

import RenderView from '../RenderView'
import AppBar from '../AppBar'
import NavDrawer from '../NavDrawer'
import Sidebar from '../Sidebar'
import cerebralTheme from '../.././theme'
import './transitions.scss'

const App = props =>
  <CerebralThemeProvider theme={cerebralTheme}>
    <CSSTransitionGroup
      transitionName="initial"
      transitionAppear={true}
      transitionAppearTimeout={1000}
      transitionEnter={false}
      transitionLeave={false}
      component="div"
    >
      <AppContainer key="appcontainer">
        {props.initialAnimation && props.initialAnimationStarted({ deviceSize: window.innerWidth < 768 ? 'small' : 'medium' })}
        <AppBar />
        {props.authenticated && <Sidebar />}
        <NavDrawer />
        <RenderView />
      </AppContainer>
    </CSSTransitionGroup>
  </CerebralThemeProvider>

App.propTypes = {
  authorizationPending: PropTypes.bool,
  deviceSizeUpdated: PropTypes.func,
  currentView: PropTypes.string,
  callsign: PropTypes.string,
  getUser: PropTypes.func,
  authenticated: PropTypes.bool,
  login: PropTypes.func,
  initialAnimation: PropTypes.bool,
  initialAnimationStarted: PropTypes.func,
}

export default connect(
  {
    currentView: state`app.currentView`,
    deviceSizeUpdated: signal`app.deviceSizeUpdated`,
    callsign: state`user.callsign`,
    getUser: signal`user.getUser`,
    login: signal`login.routed`,
    authenticated: state`authorization.authenticated`,
    drawerActive: state`app.drawerActive`,
    drawerLarge: state`app.drawerLarge`,
    initialAnimation: state`app.initialAnimation`,
    initialAnimationStarted: signal`app.initialAnimationStarted`,
  },
  App
)

const AppContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
`
