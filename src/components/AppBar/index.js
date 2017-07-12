import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'

import Button from '../Button'
import Link from '../Link'

const LoginButton = () => (
  <Link routeTo="login">
    <Button
      label="Login"
      icon="sign-in"
      outline={false}
    />
  </Link>
)

const LogoutButton = props => (
  <Link
    onClick={() => props.logout()}
    routeTo="login"
  >
    <Button
      label="Logout"
      icon="sign-out"
      outline={false}
    />
  </Link>
)

LogoutButton.propTypes = {
  logout: PropTypes.func,
}

const AppBar = props => {
  return (
    <StyledAppBar className={props.className} >
      <LogoContainer>
        {(!props.drawerActive) &&
          <Button
            icon="bars"
            outline={false}
            onClick={() => props.drawerActiveToggled({ value: !props.drawerActive })} />
        }
        <Link routeTo="dashboard">
          <Logo />
        </Link>
      </LogoContainer>
      {props.loggedIn ? <LogoutButton logout={props.logout} /> : <LoginButton />}
    </StyledAppBar>
  )
}

AppBar.propTypes = {
  drawerActive: PropTypes.bool,
  drawerActiveToggled: PropTypes.func,
  drawerLarge: PropTypes.bool,
  drawerLargeToggled: PropTypes.func,
  sidebarViewChanged: PropTypes.func,
  className: PropTypes.string,
  loggedIn: PropTypes.string,
  logout: PropTypes.func,
}

export default connect(
  {
    drawerActive: state`app.drawerActive`,
    drawerActiveToggled: signal`app.drawerActiveToggled`,
    drawerLarge: state`app.drawerLarge`,
    drawerLargeToggled: signal`app.drawerLargeToggled`,
    sidebarViewChanged: signal`app.sidebarViewChanged`,
    loggedIn: state`authorization.token`,
    logout: signal`authorization.logout`,
  },
  AppBar
)

const StyledAppBar = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.darkGray};
  color: white;
  z-index: 9999;
  animation-name: appBar;
  animation-duration: .3s;
  animation-timing-function: cubic-bezier(.4,0,.2,1);
  animation-fill-mode: backwards;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.div`
  width: 80px;
  height: 23px;
  margin-top: 4px;
  background-image: url("/images/taw-logo.png");
  background-repeat: no-repeat;
  background-position: center center;
`
