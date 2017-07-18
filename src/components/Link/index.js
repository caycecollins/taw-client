import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, props } from 'cerebral/tags'

const Link = props =>
  <StyledLink
    onClick={() => props.onClick ? props.onClick() : props.route(props.routeParams || {})}
    className={props.className}
  >
    {props.label && <Label>{props.label}</Label>}
    {props.children}
  </StyledLink>

Link.propTypes = {
  label: PropTypes.string,
  routeParams: PropTypes.object,
  route: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

Link.defaultProps = {
  outline: true,
  label: null,
}

export default connect(
  {
    route: signal`${props`routeTo`}.routed`,
  },
  Link
)

const StyledLink = styled.div`
  color: ${props => props.theme.colors.armyGreen};
  transition: color .3s ease-in-out;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.armyWhite};
  }
`

const Label = styled.div`
`
