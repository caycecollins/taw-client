import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '../Icon'

const Button = props => {
  return (
    <StyledButton
      type={props.type}
      outline={props.outline}
      small={props.small}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon &&
        <StyledIcon label={props.label}>
          <Icon
            name={props.icon}
            spin={props.iconSpin}
            pulse={props.iconPulse}
            inverse={props.iconInverse}
          />
        </StyledIcon>
      }
      <Label>{props.label}</Label>
    </StyledButton>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  iconSpin: PropTypes.bool,
  iconPulse: PropTypes.bool,
  iconInverse: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  outline: true,
}

export default Button

const StyledButton = styled.button`
  display: inline-flex;
  align-items: baseline;
  height: 33px;
  padding: 8px ${props => !props.small && '16px'};
  border-radius: 2px;
  ${props => props.outline
    ? css`
      border: 1px solid ${!props.disabled ? props.theme.colors.armyGreen : props.theme.colors.gray};
    `
    : css`
      border: 1px solid transparent;
  `}
  background-color: transparent;
  color: ${props => !props.disabled ? props.theme.colors.armyGreen : props.theme.colors.gray};
  font-size: .8rem;
  text-transform: uppercase;
  transition: all .3s ease-in-out;
  ${props => !props.disabled &&
    css`&:hover {
      background-color: rgba(0,0,0,.3);
      cursor: pointer;
      color: ${props => props.theme.colors.armyWhite};
    }
  `}
`

const StyledIcon = styled.div`
  ${props => props.label && css`padding-right: 8px;`}
`

const Label = styled.div`
`
