import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import styled, { css, keyframes } from 'styled-components'

const ViewContainer = props =>
  <Container
    drawerActive={!props.authorizationPending && props.authenticated && props.drawerActive}
    drawerLarge={props.drawerLarge}
    initialAnimation={props.initialAnimation}
    authenticated={props.authenticated}
    backgroundImage={props.backgroundImage}
    className={props.className}
    centered={props.centered}
    loggingOut={props.loggingOut}
    padding={props.padding}
  >
    {props.children}
  </Container>

ViewContainer.propTypes = {
  initialAnimation: PropTypes.bool,
  drawerActive: PropTypes.bool,
  drawerLarge: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  backgroundImage: PropTypes.string,
  authenticated: PropTypes.bool,
  authorizationPending: PropTypes.bool,
  centered: PropTypes.bool,
  loggingOut: PropTypes.bool,
  padding: PropTypes.number,
}

export default connect(
  {
    initialAnimation: state`app.initialAnimation`,
    authenticated: state`authorization.authenticated`,
    authorizationPending: state`authorization.pending`,
    loggingOut: state`authorization.loggingOut`,
    drawerActive: state`app.drawerActive`,
    drawerLarge: state`app.drawerLarge`,
  },
  ViewContainer
)

const leftPaddingMixin = css`
  ${props => {
    if (props.drawerActive) {
      if (props.drawerLarge) return '304px'
      else return '104px'
    } else {
      return '24px'
    }
  }}
`

const viewContainerAnimation = keyframes`
  from {
    margin-top: 100px;
  }
  to {
    margin-top: 0px;
  }
`

const viewContainerLogoutAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const Container = styled.div`
  ${props => props.centered && css`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `}
  width: 100%;
  height: ${props => props.authentiated ? '100vh' : 'calc(100vh - 48px)'};
  padding: ${props => props.padding || 24}px;
  padding-left: ${leftPaddingMixin};
  color: white;
  opacity: 1;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  ${props => props.backgroundImage && css`
    background: url(${props.backgroundImage});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-attachment: fixed;
  `}
  ${props => props.loggingOut && css`animation-name: ${viewContainerLogoutAnimation};`}
  ${props => props.initialAnimation && css`animation-name: ${viewContainerAnimation};`}
  animation-duration: .3s;
  animation-fill-mode: forwards;
  @media (max-width: 767px) {
    padding-left: 24px;
  }
  @media (max-width: 600px) {
  }
`
