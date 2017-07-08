import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import styled, { ThemeProvider as CerebralThemeProvider } from 'styled-components'

import RenderView from '../RenderView'
import AppBar from '../AppBar'
import NavDrawer from '../NavDrawer'
// import Sidebar from '../Sidebar'
import cerebralTheme from '../.././theme'

const App = ({ currentView }) => {
  return (
    <CerebralThemeProvider theme={cerebralTheme}>
      <AppContainer>
        <AppBar />
        <NavDrawer />
        <RenderView />
        {/* <Sidebar/> */}
      </AppContainer>
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
