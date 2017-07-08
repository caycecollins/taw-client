import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'

import Button from '../Button'

const AppBar = (props) => {
  // const menuIconClicked = () => {
  //   const windowWidth = window.innerWidth
  //   windowWidth <= 840
  //     ? props.drawerActiveToggled({ value: !props.drawerActive })
  //     : props.drawerLargeToggled({ value: !props.drawerLarge })
  // }
  return (
    <StyledAppBar>
      <LogoContainer>
        {(!props.drawerLarge && !props.drawerActive) &&
          <Button
            icon="bars"
            outline={false}
            onClick={() => props.drawerActiveToggled({ value: !props.drawerActive })} />
        }
        <Logo />
      </LogoContainer>
      <Button
        label="Signout"
        icon="sign-out"
        outline={false} />
    </StyledAppBar>
  )
}

AppBar.propTypes = {
  drawerActive: PropTypes.bool,
  drawerActiveToggled: PropTypes.func,
  drawerLarge: PropTypes.bool,
  drawerLargeToggled: PropTypes.func,
  sidebarViewChanged: PropTypes.func,
}

export default connect(
  {
    drawerActive: state`app.drawerActive`,
    drawerActiveToggled: signal`app.drawerActiveToggled`,
    drawerLarge: state`app.drawerLarge`,
    drawerLargeToggled: signal`app.drawerLargeToggled`,
    sidebarViewChanged: signal`app.sidebarViewChanged`,
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
