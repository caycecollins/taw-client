import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled, { ThemeProvider as CerebralThemeProvider } from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'

import RenderView from '../RenderView'
import AppBar from '../AppBar'
import NavDrawer from '../NavDrawer'
import Sidebar from '../Sidebar'
import cerebralTheme from '../.././theme'
import './transitions.scss'

const App = props => {
  props.authenticated ? props.getUser() : props.login()
  props.initialDrawerAnimation && props.startInitialDrawerAnimation()
  return (
    <CerebralThemeProvider theme={cerebralTheme}>
      <CSSTransitionGroup
        transitionName="initial"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
        component="div"
      >
        {props.currentView &&
          <AppContainer key="appcontainer">
            <AppBar />
            <Sidebar />
            <NavDrawer />
            <RenderView />
          </AppContainer>
        }
      </CSSTransitionGroup>
    </CerebralThemeProvider>
  )
}

App.propTypes = {
  authorizationPending: PropTypes.bool,
  currentView: PropTypes.string,
  getUser: PropTypes.func,
  authenticated: PropTypes.bool,
  login: PropTypes.func,
  initialDrawerAnimation: PropTypes.bool,
  startInitialDrawerAnimation: PropTypes.func,
}

export default connect(
  {
    currentView: state`app.currentView`,
    getUser: signal`user.getUser`,
    login: signal`login.routed`,
    authenticated: state`authorization.authenticated`,
    drawerActive: state`app.drawerActive`,
    drawerLarge: state`app.drawerLarge`,
    initialDrawerAnimation: state`app.initialDrawerAnimation`,
    startInitialDrawerAnimation: signal`app.startInitialDrawerAnimation`,
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
