import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled, { css, keyframes } from 'styled-components'
import { rgba } from 'polished'
import { CSSTransitionGroup } from 'react-transition-group'

import Button from '../Button'
import Link from '../Link'
import Icon from '../Icon'

const userMenuItems = [
  { label: 'My Profile', route: 'profile.routed', icon: 'user' },
  { label: 'Notifications', route: 'notifications.routed', icon: 'bell' },
]

const menuItems = [
  { label: 'Dashboard', route: 'dashboard.routed', icon: 'th' },
  { label: 'Events', route: 'events.routed', icon: 'calendar' },
  { label: 'Game Divisions', route: 'games.routed', icon: 'sitemap' },
]

const adminMenuItems = [
  { label: 'Reports', route: 'reports.routed', icon: 'line-chart' },
]

const getListItems = (props, items) => items.map((item, index) => {
  return (
    <Link
      routeTo={item.route}
      key={item.route}
      title={item.label}
    >
      <ListItem
        disabled={props.currentView && item.route.search(props.currentView) > -1}
        iconOnly={!props.drawerLarge}
      >
        <StyledIcon label={props.drawerLarge}>
          <Icon size={props.drawerLarge ? 16 : 20} name={item.icon} />
        </StyledIcon>
        {props.drawerLarge && <Label>{item.label}</Label>}
      </ListItem>
    </Link>
  )
})

const NavDrawer = props =>
  <NavDrawerContainer
    active={!props.authorizationPending && props.authenticated && props.drawerActive}
    large={props.drawerLarge}
    className={props.className}
    initialAnimation={props.initialAnimation}
  >
    <CSSTransitionGroup
      transitionName="sidebarOverlay"
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      component="div"
    >
      {props.drawerActive && props.drawerLarge &&
        <NavDrawerMobileOverlay
          key="drawerOverlay"
          onClick={() => props.drawerActiveToggled({ value: false })}
        />
      }
    </CSSTransitionGroup>
    <NavDrawerToggles>
      <Button
        size="xs"
        iconSize={12}
        outline={false}
        onClick={() => props.drawerActiveToggled({ value: false })}
        icon="close"
      />
      <Button
        size="xs"
        outline={false}
        onClick={() => props.drawerLargeToggled({ value: !props.drawerLarge })}
        icon={props.drawerLarge ? 'angle-double-left' : 'angle-double-right'}
      />
    </NavDrawerToggles>
    <User large={props.drawerActive && props.drawerLarge}>
      <Link routeTo="profile.routed">
        <Avatar large={props.drawerLarge} />
      </Link>
      {props.user && props.drawerLarge &&
        <UserInfo>
          <Link routeTo="profile.routed">
            <Callsign>{props.user.callsign}</Callsign>
          </Link>
          <Rank>
            <RankIcon />
            <RankText>{props.user.rank.name}</RankText>
          </Rank>
          <PrimaryUnit>{props.user.highestPosition.unit.name}</PrimaryUnit>
        </UserInfo>
      }
    </User>
    <Navigation user={true}>
      <List>{getListItems(props, userMenuItems)}</List>
    </Navigation>
    <Navigation>
      <List>{getListItems(props, menuItems)}</List>
      <List>{getListItems(props, adminMenuItems)}</List>
    </Navigation>
  </NavDrawerContainer>

NavDrawer.propTypes = {
  authorizationPending: PropTypes.bool,
  currentView: PropTypes.string,
  initialAnimation: PropTypes.bool,
  drawerActive: PropTypes.bool,
  drawerActiveToggled: PropTypes.func,
  drawerLarge: PropTypes.bool,
  drawerLargeToggled: PropTypes.func,
  drawerMinimal: PropTypes.bool,
  routeTo: PropTypes.func,
  className: PropTypes.string,
  authenticated: PropTypes.bool,
  user: PropTypes.object,
}

export default connect(
  {
    authorizationPending: state`authorization.pending`,
    currentView: state`app.currentView`,
    initialAnimation: state`app.initialAnimation`,
    drawerActive: state`app.drawerActive`,
    drawerActiveToggled: signal`app.drawerActiveToggled`,
    drawerLarge: state`app.drawerLarge`,
    drawerLargeToggled: signal`app.drawerLargeToggled`,
    drawerMinimal: state`app.drawerMinimal`,
    authenticated: state`authorization.authenticated`,
    user: state`user`,
  },
  NavDrawer
)

const navDrawerLargeAnimation = keyframes`
  from {
    left: -280px;
  }
  to {
    left: 0px;
  }
`

const navDrawerSmallAnimation = keyframes`
  from {
    left: -80px;
  }
  to {
    left: 0px;
  }
`

const drawerLeftMixin = css`
  ${props => {
    if (props.active && !props.initialAnimation) {
      return '0px'
    } else {
      if (props.large) return '-280px'
      return '-80px'
    }
  }}
`

const animationName = css`
  ${props => props.large ? navDrawerLargeAnimation : navDrawerSmallAnimation}
`

const initialAnimationMixin = css`
  ${props => css`
    left: ${drawerLeftMixin};
    animation-name: ${animationName};
    animation-duration: .3s;
    animation-timing-function: cubic-bezier(.4,0,.2,1);
    animation-fill-mode: forwards;
    animation-delay: .2s;
  `}
`

const NavDrawerMobileOverlay = styled.div`
  position: fixed;
  width: 100vh;
  height: 100vh;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  visibility: hidden;
  background-color: ${props => { return rgba(props.theme.colors.darkGray, 0.7) }};
  z-index: -1;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  @media (max-width: 600px) {
    opacity: 1;
    visibility: visible;
  }
`

const NavDrawerContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: ${props => props.large ? '280' : '80'}px;
  height: calc(100% - 48px);
  top: 48px;
  background-color: ${props => { return rgba(props.theme.colors.darkGray4, 0.9) }};
  z-index: 9998;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  left: ${props => drawerLeftMixin};
  ${props => props.active && props.initialAnimation && initialAnimationMixin}
  @media (max-width: 600px) {
    background-color: ${props => { return rgba(props.theme.colors.darkGray4, 0.97) }};
  }
`

const NavDrawerToggles = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const User = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  height: 160px;
  min-height: 160px;
  padding: ${props => props.large ? '48px 24px 8px 24px;' : '48px 8px;'};
  color: white;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  white-space: nowrap;
`

const Avatar = styled.img`
  flex: 1 0 auto;
  width: ${props => props.large ? '80' : '56'}px;
  ${props => !props.large && 'max-width: 80px;'}
  height: ${props => props.large ? '80' : '60'}px;
  background-color: ${props => props.theme.colors.lightTan};
  border-radius: 2px;
  white-space: nowrap;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  ${props => props.image && css`
    background-image: url(${props.image});
    background-repeat: no-repeat;
    backgorund-size: contain;
    background-position: center center;
  `}
`

const UserInfo = styled.div`
  display: flex;
  flex: ${props => props.large ? '1 0 auto' : '1 0 auto'};
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 16px;
  padding-right: 28px;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  `

const Callsign = styled.div`
  font-size: 1.2rem;
  margin-bottom: 20px;
`

const Rank = styled.div`
  font-size: 0.8rem;
`

const RankIcon = styled.div`

`

const RankText = styled.div`
  font-size: 0.9rem;
`

const PrimaryUnit = styled.div`
  font-size: 0.8rem;
`

const Navigation = styled.div`
  flex: ${props => !props.user && 1};
  padding: 8px 0;
  background-color: ${props => !props.user ? rgba(props.theme.colors.darkGray6, 0.6) : 'transparent'};
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const ListItem = styled.li`
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 64px;
  color: ${props => props.theme.colors.armyGreen};
  transition: all .3s cubic-bezier(.4,0,.2,1);
  text-transform: uppercase;
  ${props => props.iconOnly
    ? css`padding: 8px 30px;`
    : css`padding: 8px 24px;`}
  ${props => props.disabled
    ? css`
        background-color: rgba(0,0,0,.8);
        color: ${props.theme.colors.armyWhite};
        &:hover {
          cursor: default;
        }
    `
    : css`
        &:hover {
          color: ${props.theme.colors.lightTan};
          background-color: rgba(0,0,0,.4);
          cursor: pointer;
        }
    `}
`

const StyledIcon = styled.div`
  ${props => props.label && css`padding-right: 16px;`}
`

const Label = styled.div`
  margin-bottom: -3px;
`
