import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FAIcon from 'react-fa'

function Icon (props) {
  return (
    <StyledIcon size={props.size}>
      <FAIcon
        name={props.name}
        spin={props.spin}
        pulse={props.pulse}
        inverse={props.inverse}
        className={props.className}
      />
    </StyledIcon>
  )
}

Icon.propTypes = {
  size: PropTypes.number,
  name: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  spin: PropTypes.bool,
  pulse: PropTypes.bool,
  inverse: PropTypes.bool,
  className: PropTypes.string,
}

Icon.defaultProps = {
  size: 16,
  name: '',
  spin: false,
  pulse: false,
  inverse: false,
}

export default Icon

const StyledIcon = styled.div`
  min-width: ${props => props.size}px;
  font-size: ${props => props.size}px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  transition: font-size .3s ease-in-out;
`
