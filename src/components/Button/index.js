import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '../Icon'

const Button = props => {
  function calculateIconSize () {
    if (props.icon && !props.iconSize) {
      if (props.size === 'xs') return 14
      if (props.size === 'sm') return 15
      if (!props.size || props.size === 'md') return 16
      if (props.size === 'lg') return 18
    } else {
      return props.iconSize
    }
    return 16
  }
  return (
    <StyledButton
      type={props.type}
      outline={props.outline}
      size={props.size}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon &&
        <StyledIcon label={props.label}>
          <Icon
            name={props.icon}
            size={calculateIconSize()}
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
  size: PropTypes.string,
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
  align-items: center;
  height: ${props => {
    if (props.size === 'xs') return '29px'
    if (!props.size || props.size === 'sm') return '33px'
    if (props.size === 'md') return '37px'
    if (props.size === 'lg') return '41px'
  }};
  padding: ${props => {
    if (props.size === 'xs') return '4px 10px 4px 10px'
    if (!props.size || props.size === 'sm') return '6px 16px 5px 16px'
    if (props.size === 'md') return '8px 20px 7px 20px'
    if (props.size === 'lg') return '10px 22px 8px 22px'
  }};
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
  font-size: ${props => {
    if (props.size === 'xs') return '.65rem'
    if (!props.size || props.size === 'sm') return '.72rem'
    if (props.size === 'md') return '.85rem'
    if (props.size === 'lg') return '1rem'
  }};
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
  margin-bottom: 2px;
  ${props => props.label && css`padding-right: 8px;`}
`

const Label = styled.div`
`
