import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled, { css, keyframes } from 'styled-components'

import Button from '../Button'
import Link from '../Link'

const LoginButton = () =>
  <Link routeTo="login.routed">
    <Button
      label="Login"
      icon="sign-in"
      outline={false}
    />
  </Link>

const LogoutButton = props =>
  <Link
    onClick={() => props.logout()}
    routeTo="login.routed"
  >
    <Button
      label="Logout"
      icon="sign-out"
      outline={false}
    />
  </Link>

LogoutButton.propTypes = {
  logout: PropTypes.func,
}

const AppBar = props =>
  <StyledAppBar
    authenticated={props.authenticated}
  >
    <LogoContainer>
      {(!props.drawerActive && props.authenticated) &&
        <Button
          icon="bars"
          outline={false}
          onClick={() => props.drawerActiveToggled({ value: !props.drawerActive })} />
      }
      <Link routeTo="dashboard.routed">
        <Logo />
      </Link>
    </LogoContainer>
    {props.authenticated ? <LogoutButton logout={props.logout} /> : <LoginButton />}
  </StyledAppBar>

AppBar.propTypes = {
  drawerActive: PropTypes.bool,
  drawerActiveToggled: PropTypes.func,
  drawerLarge: PropTypes.bool,
  drawerLargeToggled: PropTypes.func,
  logout: PropTypes.func,
  authorizationPending: PropTypes.bool,
  authenticated: PropTypes.bool,
}

export default connect(
  {
    drawerActive: state`app.drawerActive`,
    drawerActiveToggled: signal`app.drawerActiveToggled`,
    drawerLarge: state`app.drawerLarge`,
    drawerLargeToggled: signal`app.drawerLargeToggled`,
    logout: signal`authorization.logout`,
    authorizationPending: state`authorization.pending`,
    authenticated: state`authorization.authenticated`,
  },
  AppBar
)

const StyledAppBar = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: ${props => props.authenticated ? '0px' : '-48px'};
  left: 0;
  width: 100%;
  height: 48px;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.darkGray};
  color: white;
  z-index: 9999;
  transition: all .3s cubic-bezier(.4,0,.2,1);
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
