import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import styled, { css, keyframes } from 'styled-components'

class ViewContainer extends Component {
  componentWillMount () {
    this.container && this.container.scrollTop(0)
  }

  render () {
    return (
      <Container
        drawerActive={!this.props.authorizationPending && this.props.authenticated && this.props.drawerActive}
        drawerLarge={this.props.drawerLarge}
        initialAnimation={this.props.initialAnimation}
        authenticated={this.props.authenticated}
        backgroundImage={this.props.backgroundImage}
        className={this.props.className}
        centered={this.props.centered}
        loggingOut={this.props.loggingOut}
        padding={this.props.padding}
        innerRef={container => this.container = container}
      >
        {this.props.children}
      </Container>
    )
  }
}

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

const leftPaddingMixin = props => {
  const extraPadding = props.padding >= 0 ? props.padding : 48
  if (props.drawerActive) {
    if (props.drawerLarge) return `calc(280px + ${extraPadding}px)`
    else return `calc(80px + ${extraPadding}px)`
  } else {
    return `${extraPadding}px`
  }
}

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
  padding: ${props => props.padding > -1 ? props.padding : 48}px;
  padding-left: ${props => leftPaddingMixin(props)};
  color: white;
  opacity: 1;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  overflow: auto;
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
