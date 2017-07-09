import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import styled, { ThemeProvider as CerebralThemeProvider } from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'

import RenderView from '../RenderView'
import AppBar from '../AppBar'
import NavDrawer from '../NavDrawer'
// import Sidebar from '../Sidebar'
import cerebralTheme from '../.././theme'
import './transitions.scss'

const App = ({ currentView }) => {
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
        <AppContainer>
          <AppBar />
          <NavDrawer />
          <RenderView />
          {/* <Sidebar/> */}
        </AppContainer>
      </CSSTransitionGroup>
    </CerebralThemeProvider>
  )
}

App.propTypes = {
  currentView: PropTypes.string,
}

export default connect(
  {
    currentView: state`app.currentView`,
  },
  App
)

const AppContainer = styled.div`
  padding: 0;
  margin: 0;
`
