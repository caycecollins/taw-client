import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import styled, { css } from 'styled-components'

function ViewContainer (props) {
  return (
    <Container
      drawerActive={!props.authorizationPending && props.authenticated && props.drawerActive}
      drawerLarge={props.drawerLarge}
      authenticated={props.authenticated}
      backgroundImage={props.backgroundImage}
      className={props.className}
    >
      {props.children}
    </Container>
  )
}

ViewContainer.propTypes = {
  drawerActive: PropTypes.bool,
  drawerLarge: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  backgroundImage: PropTypes.string,
  authenticated: PropTypes.bool,
  authorizationPending: PropTypes.bool,
}

export default connect(
  {
    authenticated: state`authorization.authenticated`,
    authorizationPending: state`authorization.pending`,
    drawerActive: state`app.drawerActive`,
    drawerLarge: state`app.drawerLarge`,
  },
  ViewContainer
)

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 24px;
  padding-left: ${props => {
    if (props.drawerActive && props.authenticated) {
      if (props.drawerLarge) return '304px'
      else return '104px'
    } else {
      return '24px'
    }
  }};
  ${props => props.backgroundImage && css`
    background: url(${props.backgroundImage});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-attachment: fixed;
  `}
  color: white;
  transition: all .3s cubic-bezier(.4,0,.2,1);
`
