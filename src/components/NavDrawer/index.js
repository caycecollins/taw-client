import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled, { css, keyframes } from 'styled-components'
import { rgba } from 'polished'

import Button from '../Button'
import Link from '../Link'
import Icon from '../Icon'

const userMenuItems = [
  { label: 'My Profile', route: 'profile', icon: 'user' },
  { label: 'Notifications', route: 'notifications', icon: 'bell' },
]

const menuItems = [
  { label: 'Dashboard', route: 'dashboard', icon: 'th' },
  { label: 'Events', route: 'events', icon: 'calendar' },
  { label: 'Game Divisions', route: 'games', icon: 'sitemap' },
]

const adminMenuItems = [
  { label: 'Reports', route: 'reports', icon: 'line-chart' },
]

const NavDrawer = props => {
  function getListItems (items) {
    return items.map((item, index) => {
      return (
        <Link routeTo={item.route} key={item.route}>
          <ListItem
            disabled={props.currentView && item.route.search(props.currentView) > -1}
            iconOnly={!props.drawerLarge}
          >
            <StyledIcon label={props.drawerLarge}>
              <Icon size={props.drawerLarge ? 16 : 20} name={item.icon} />
            </StyledIcon>
            {props.drawerLarge && <div>{item.label}</div>}
          </ListItem>
        </Link>
      )
    })
  }
  return (
    <NavDrawerContainer
      active={!props.authorizationPending && props.authenticated && props.drawerActive}
      large={props.drawerLarge}
      className={props.className}
      initialDrawerAnimation={props.initialDrawerAnimation}
    >
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
      <User small={props.drawerActive && !props.drawerLarge}>
        <Avatar />
        {props.drawerLarge && 'Callsign'}
      </User>
      <Navigation user={true}>
        <List>{getListItems(userMenuItems)}</List>
      </Navigation>
      <Navigation>
        <List>{getListItems(menuItems)}</List>
        <List>{getListItems(adminMenuItems)}</List>
      </Navigation>
    </NavDrawerContainer>
  )
}

NavDrawer.propTypes = {
  authorizationPending: PropTypes.bool,
  currentView: PropTypes.string,
  initialDrawerAnimation: PropTypes.bool,
  drawerActive: PropTypes.bool,
  drawerActiveToggled: PropTypes.func,
  drawerLarge: PropTypes.bool,
  drawerLargeToggled: PropTypes.func,
  drawerMinimal: PropTypes.bool,
  routeTo: PropTypes.func,
  className: PropTypes.string,
  authenticated: PropTypes.bool,
}

export default connect(
  {
    authorizationPending: state`authorization.pending`,
    currentView: state`app.currentView`,
    initialDrawerAnimation: state`app.initialDrawerAnimation`,
    drawerActive: state`app.drawerActive`,
    drawerActiveToggled: signal`app.drawerActiveToggled`,
    drawerLarge: state`app.drawerLarge`,
    drawerLargeToggled: signal`app.drawerLargeToggled`,
    drawerMinimal: state`app.drawerMinimal`,
    authenticated: state`authorization.authenticated`,
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
    if (props.active && !props.initialDrawerAnimation) {
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
    animation-duration: .6s;
    animation-timing-function: cubic-bezier(.4,0,.2,1);
    animation-fill-mode: forwards;
    animation-delay: .6s;
  `}
`

const NavDrawerContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: ${props => props.large ? '280' : '80'}px;
  height: calc(100% - 48px);
  top: 48px;
  background-color: ${props => { return rgba(props.theme.colors.darkGray4, 0.9) }};
  z-index: 9998;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  left: ${props => drawerLeftMixin};
  ${props => props.active && props.initialDrawerAnimation && initialAnimationMixin}
`

const NavDrawerToggles = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: ${props => props.small ? '80px' : '160px'};
  width: 100%;
  padding: 24px;
  color: white;
  margin-bottom: 16px;
  transition: all .3s cubic-bezier(.4,0,.2,1);
`

const Avatar = styled.img`
  width: 100%;
  height: auto;
  background-color: ${props => props.theme.colors.lightTan};
  border-radius: 4px;
`

const Navigation = styled.div`
  flex: ${props => !props.user && '1'};
  padding: 0;
  padding: 8px 0;
  background-color: ${props => !props.user ? rgba(props.theme.colors.darkGray6, 0.6) : 'transparent'};
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ListItem = styled.li`
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 64px;
  color: ${props => props.theme.colors.armyGreen};
  ${props => props.iconOnly
    ? css`padding: 8px 30px;`
    : css`padding: 8px 16px;`}
  transition: all .3s ease-in-out;
  text-transform: uppercase;
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
