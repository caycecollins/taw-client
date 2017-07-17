import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import styled, { css, keyframes } from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'
// import config from 'config'

// import Signup from '../Signup'
import Login from '../Login'
import Dashboard from '../Dashboard'
import Events from '../Events'
import Game from '../Game'
import Games from '../Games'
import Reports from '../Reports'
import Profile from '../Profile'
import Notifications from '../Notifications'
import FourOhFour from '../FourOhFour'
import ViewContainer from '../ViewContainer'

const views = {
  login: Login,
  // signup: Signup,
  profile: Profile,
  notifications: Notifications,
  dashboard: Dashboard,
  events: Events,
  game: Game,
  games: Games,
  reports: Reports,
  fourohfour: FourOhFour,
  empty: ViewContainer,
}

const RenderView = ({ sidebarActive, initialDrawerAnimation, authorizationPending, authenticated, currentView, lastVisited, drawerActive, drawerLarge }) => {
  // if (!config.production) {
  //   views[currentView]
  //     ? console.log(`mounting ${currentView} component`)
  //     : console.log(`There is no component for "${currentView}", using "dashboard" component instead.`)
  // }
  const Component = currentView ? views[currentView] || views.fourohfour : views.empty
  return (
    <PageContainer
      initialDrawerAnimation={initialDrawerAnimation}
      authenticated={authenticated && !authorizationPending}
      sidebarActive={sidebarActive}
    >
      <CSSTransitionGroup
        transitionName="view"
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={400}
        component="div"
      >
        <FullWidthHeight
          key={currentView}
          drawerActive={drawerActive}
          drawerLarge={drawerLarge}
          sidebarActive={sidebarActive}
        >
          <Component />
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
  sidebarActive: PropTypes.bool,
  authenticated: PropTypes.bool,
  authorizationPending: PropTypes.bool,
  initialDrawerAnimation: PropTypes.bool,
}

export default connect(
  {
    currentView: state`app.currentView`,
    lastVisited: state`app.lastVisited`,
    drawerActive: state`app.drawerActive`,
    drawerLarge: state`app.drawerLarge`,
    sidebarActive: state`app.sidebarActive`,
    authenticated: state`authorization.authenticated`,
    authorizationPending: state`authorization.pending`,
    initialDrawerAnimation: state`app.initialDrawerAnimation`,
  },
  RenderView
)

const PageContainerAnimation = keyframes`
  from {
    top: 0px;
    height: 100vh;
  }
  to {
    top: 48px;
    height: calc(100vh - 48px);
  }
`

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 48px);
  ${props => !props.authenticated && 'height: 100vh;'}
  left: 0;
  top: ${props => props.authenticated ? '48px' : '0px'};
  overflow-y: ${props => props.authenticated && !props.sidebarActive ? 'scroll' : 'hidden'};
  overflow-x: hidden;
  background: linear-gradient(-90deg, #3E4039, #0F0F0E);
  ${props => props.authenticated && props.initialDrawerAnimation && css`
    animation-name: ${PageContainerAnimation};
    animation-duration: .6s;
    animation-timing-function: cubic-bezier(.4,0,.2,1);
    animation-fill-mode: backwards;
  `}
`

const FullWidthHeight = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: auto;
  min-height: 100%;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  background: linear-gradient(-90deg, #3E4039, #0F0F0E);
  padding-right: ${props => props.sidebarActive ? '17px' : '0px'};
  transition: padding-right 0s ease;
`
