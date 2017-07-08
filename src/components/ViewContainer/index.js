import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import styled, { css } from 'styled-components'

function ViewContainer (props) {
  return (
    <Container
      drawerActive={props.drawerActive}
      drawerLarge={props.drawerLarge}
      backgroundImage={props.backgroundImage}
      className={props.className} // required for overriding from other components
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
}

export default connect(
  {
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
    if (props.drawerActive) {
      if (props.drawerLarge) return '344px'
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
