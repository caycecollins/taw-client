import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal, props } from 'cerebral/tags'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'

import Button from '../Button'
import Link from '../Link'

const userMenuItems = [
  { label: 'My Profile', route: 'profile', icon: 'person' },
  { label: 'Notifications', route: 'notifications', icon: 'bell' },
]

const menuItems = [
  { label: 'Dashboard', route: 'dashboard', icon: 'th' },
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
            disabled={item.route === props.currentView}
          >
            {item.label}
          </ListItem>
        </Link>
      )
    })
  }
  return (
    <NavDrawerContainer
      active={props.drawerActive}
      large={props.drawerLarge}
    >
      <NavDrawerToggles>
        <Button
          small={true}
          outline={false}
          onClick={() => {
            props.drawerLargeToggled({ value: false })
            props.drawerActiveToggled({ value: false })
          }}
          icon="close"
        />
        <Button
          small={true}
          outline={false}
          onClick={() => props.drawerLargeToggled({ value: !props.drawerLarge })}
          icon={props.drawerLarge ? 'angle-double-left' : 'angle-double-right'}
        />
      </NavDrawerToggles>
      <User>
        <Avatar />
        Callsign
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
  currentView: PropTypes.string,
  drawerActive: PropTypes.bool,
  drawerActiveToggled: PropTypes.func,
  drawerLarge: PropTypes.bool,
  drawerLargeToggled: PropTypes.func,
  drawerMinimal: PropTypes.bool,
  routeTo: PropTypes.func,
}

export default connect(
  {
    currentView: state`app.currentView`,
    drawerActive: state`app.drawerActive`,
    drawerActiveToggled: signal`app.drawerActiveToggled`,
    drawerLarge: state`app.drawerLarge`,
    drawerLargeToggled: signal`app.drawerLargeToggled`,
    drawerMinimal: state`app.drawerMinimal`,
  },
  NavDrawer
)

const NavDrawerContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: ${props => props.active ? '0' : '-320'}px;
  width: ${props => props.large ? '320' : '80'}px;
  height: calc(100% - 48px);
  top: 48px;
  background-color: ${props => { return rgba(props.theme.colors.darkGray4, 0.9) }};
  z-index: 9998;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  overflow-y: auto;
  overflow-x: hidden;
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
  height: 160px;
  width: 100%;
  padding: 24px;
  color: white;
  margin-bottom: 16px;
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
  background-color: ${props => { if (!props.user) return rgba(props.theme.colors.darkGray6, 0.6) }};
`
const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ListItem = styled.li`
  display: flex;
  align-items: center;
  height: 64px;
  color: ${props => props.theme.colors.armyGreen};
  padding: 8px 16px;
  transition: all .1s ease-in-out;
  text-transform: uppercase;
  ${props => props.disabled
    ? css`
        background-color: rgba(0,0,0,.5);
        &:hover {
          cursor: default;
        }
      `
    : css`
        &:hover {
          background-color: rgba(0,0,0,.2);
          cursor: pointer;
        }
      `
  }
`
