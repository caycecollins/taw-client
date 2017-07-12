import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import styled, { css, keyframes } from 'styled-components'

function ViewContainer (props) {
  return (
    <Container
      drawerActive={!props.authorizationPending && props.authenticated && props.drawerActive}
      drawerLarge={props.drawerLarge}
      initialDrawerAnimation={props.initialDrawerAnimation}
      authenticated={props.authenticated}
      backgroundImage={props.backgroundImage}
      className={props.className}
      centered={props.centered}
    >
      {props.children}
    </Container>
  )
}

ViewContainer.propTypes = {
  initialDrawerAnimation: PropTypes.bool,
  drawerActive: PropTypes.bool,
  drawerLarge: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  backgroundImage: PropTypes.string,
  authenticated: PropTypes.bool,
  authorizationPending: PropTypes.bool,
  centered: PropTypes.bool,
}

export default connect(
  {
    initialDrawerAnimation: state`app.initialDrawerAnimation`,
    authenticated: state`authorization.authenticated`,
    authorizationPending: state`authorization.pending`,
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
    padding-left: 24px;
  }
  to {
    padding-left: ${leftPaddingMixin};
  }
`

const Container = styled.div`
  ${props => props.centered && css`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  `}
  width: 100%;
  height: auto;
  padding: 24px;
  padding-left: ${leftPaddingMixin};
  ${props => props.backgroundImage && css`
    background: url(${props.backgroundImage});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-attachment: fixed;
  `}
  color: white;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  ${props => props.initialDrawerAnimation && css`
    animation-name: ${viewContainerAnimation};
    animation-duration: .6s;
    animation-timing-function: cubic-bezier(.4,0,.2,1);
    animation-fill-mode: backwards;
    animation-delay: .6s;
  `}
`
