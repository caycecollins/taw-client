import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled, { ThemeProvider as CerebralThemeProvider } from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'

import RenderView from '../RenderView'
import AppBar from '../AppBar'
import NavDrawer from '../NavDrawer'
import Sidebar from '../Sidebar'
import Modal from '../Modal'
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
        <Modal />
      </AppContainer>
    </CSSTransitionGroup>
  </CerebralThemeProvider>

App.propTypes = {
  authenticated: PropTypes.bool,
  initialAnimation: PropTypes.bool,
  initialAnimationStarted: PropTypes.func,
}

export default connect(
  {
    authenticated: state`authorization.authenticated`,
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
