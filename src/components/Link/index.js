import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, props } from 'cerebral/tags'

function Link ({ changeView, routeParams, label, className, children }) {
  return (
    <StyledLink
      onClick={() => changeView(routeParams || {})}
      className={className} // used to override incoming styled-component changes
    >
      {label && <Label>{label}</Label>}
      {children}
    </StyledLink>
  )
}

Link.propTypes = {
  viewChanged: PropTypes.func,
  label: PropTypes.string,
  routeParams: PropTypes.object,
  changeView: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
}

Link.defaultProps = {
  outline: true,
  label: null,
}

export default connect(
  {
    changeView: signal`${props`routeTo`}.routed`,
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
