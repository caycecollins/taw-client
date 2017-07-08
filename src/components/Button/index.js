import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '../Icon'

const Button = props => {
  return (
    <StyledButton
      outline={props.outline}
      small={props.small}
      onClick={props.onClick}
    >
      {props.icon &&
        <StyledIcon label={props.label}>
          <Icon spin={props.iconSpin} name={props.icon} />
        </StyledIcon>
      }
      <Label>{props.label}</Label>
    </StyledButton>
  )
}

Button.propTypes = {
  outline: PropTypes.bool,
  small: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  iconSpin: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  outline: true,
}

export default Button

const StyledButton = styled.div`
  display: inline-flex;
  align-items: baseline;
  height: 33px;
  padding: 8px ${props => !props.small && '16px'};
  border-radius: 2px;
  ${props => props.outline && css`
    border: 1px solid ${props => props.theme.colors.armyGreen};
  `}
  background-color: transparent;
  color: ${props => props.theme.colors.armyGreen};
  font-size: .8rem;
  text-transform: uppercase;
  transition: all .3s ease-in-out;
  &:hover {
    background-color: rgba(0,0,0,.3);
    cursor: pointer;
    color: ${props => props.theme.colors.armyWhite};
  }
`

const StyledIcon = styled.div`
  ${props => props.label && css`padding-right: 8px;`}
`

const Label = styled.div`
`

