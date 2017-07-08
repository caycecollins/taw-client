import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FAIcon from 'react-fa'

function Icon (props) {
  return (
    <StyledIcon size={props.size}>
      <FAIcon spin={props.spin} name={props.name} />
    </StyledIcon>
  )
}

Icon.propTypes = {
  size: PropTypes.number,
  name: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  spin: PropTypes.string,
}

Icon.defaultProps = {
  size: 16,
  name: null,
  spin: false,
}

export default Icon

const StyledIcon = styled.div`
  min-width: ${props => props.size}px;
  font-size: ${props => props.size}px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  transition: all .3s ease-in-out;
`
