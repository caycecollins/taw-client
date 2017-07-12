import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import styled from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'
import config from 'config'

// import Signup from '../Signup'
import Login from '../Login'
import Home from '../Home'
import Dashboard from '../Dashboard'
import Game from '../Game'
import Games from '../Games'
import Reports from '../Reports'
import Profile from '../Profile'
import Notifications from '../Notifications'
import FourOhFour from '../FourOhFour'

const views = {
  home: Home,
  dashboard: Dashboard,
  // signup: Signup,
  login: Login,
  game: Game,
  games: Games,
  reports: Reports,
  profile: Profile,
  notifications: Notifications,
  fourohfour: FourOhFour,
}

const RenderView = ({ authorizationPending, authenticated, currentView, lastVisited, drawerActive, drawerLarge }) => {
  if (!config.production) {
    views[currentView]
      ? console.log(`mounting ${currentView} component`)
      : console.log(`There is no component for "${currentView}", using "dashboard" component instead.`)
  }
  const Component = views[currentView] || views.fourohfour
  return (
    <PageContainer loggedIn={authenticated}>
      <CSSTransitionGroup
        transitionName="view"
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        component="div"
      >
        <FullWidthHeight
          key={currentView}
          drawerActive={drawerActive}
          drawerLarge={drawerLarge}
        >
          {!authorizationPending && authenticated && currentView === 'login' ? <Login /> : <Component />}
        </FullWidthHeight>
      </CSSTransitionGroup>
    </PageContainer>
  )
}

RenderView.propTypes = {
  currentView: PropTypes.string,
  lastVisited: PropTypes.string,
  drawerActive: PropTypes.bool,
  drawerLarge: PropTypes.bool,
  authenticated: PropTypes.bool,
  authorizationPending: PropTypes.bool,
}

export default connect(
  {
    currentView: state`app.currentView`,
    lastVisited: state`app.lastVisited`,
    drawerActive: state`app.drawerActive`,
    drawerLarge: state`app.drawerLarge`,
    authenticated: state`authorization.authenticated`,
    authorizationPending: state`authorization.pending`,
  },
  RenderView
)

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 48px);
  left: 0;
  top: 48px;
  overflow-y: scroll;
  overflow-x: hidden;
  background: linear-gradient(-90deg, #3E4039, #0F0F0E);
  transition: all .3s cubic-bezier(.4,0,.2,1);
`

const FullWidthHeight = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: auto;
  min-height: 100%;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  background: linear-gradient(-90deg, #3E4039, #0F0F0E);
`
