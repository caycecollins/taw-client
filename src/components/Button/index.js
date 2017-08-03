import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '../Icon'

const calculateIconSize = props => {
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

const Button = props =>
  <StyledButton
    type={props.type}
    outline={props.outline}
    size={props.size}
    onClick={props.onClick}
    disabled={props.disabled}
    className={props.className}
    danger={props.danger}
    secondary={props.secondary}
    removeLeftPadding={props.removeLeftPadding}
  >
    {props.icon &&
      <StyledIcon
        label={props.label}
        iconMarginless={props.iconMarginless}
      >
        <Icon
          name={props.icon}
          size={calculateIconSize(props)}
          spin={props.iconSpin}
          pulse={props.iconPulse}
          inverse={props.iconInverse}
        />
      </StyledIcon>
    }
    <Label>{props.label}</Label>
  </StyledButton>

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
  className: PropTypes.string,
  danger: PropTypes.bool,
  secondary: PropTypes.bool,
  removeLeftPadding: PropTypes.bool,
  iconMarginless: PropTypes.bool,
}

Button.defaultProps = {
  outline: true,
}

export default Button

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
  background-color: transparent;
  color: ${props => {
    if (props.disabled) return props.theme.colors.gray
    if (props.danger) return props.theme.colors.lightRed
    if (props.secondary) return props.theme.colors.gray
    return props.theme.colors.armyGreen
  }};
  text-transform: uppercase;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  height: ${props => {
    if (props.size === 'xs') return '29px'
    if (!props.size || props.size === 'sm') return '33px'
    if (props.size === 'md') return '37px'
    if (props.size === 'lg') return '41px'
  }};
  padding: ${props => {
    if (props.size === 'xs') return '4px 8px'
    if (!props.size || props.size === 'sm') return '6px 16px 5px 16px'
    if (props.size === 'md') return '8px 20px 7px 20px'
    if (props.size === 'lg') return '10px 22px 8px 22px'
  }};
  ${props => props.removeLeftPadding && 'padding-left: 0px;'}
  border: 1px solid ${props => {
    if (!props.outline) return 'transparent'
    if (props.disabled) return props.theme.colors.gray
    if (props.danger) return props.theme.colors.lightRed
    if (props.secondary) return props.theme.colors.gray
    return props.theme.colors.armyGreen
  }};
  font-size: ${props => {
    if (props.size === 'xs') return '.65rem'
    if (!props.size || props.size === 'sm') return '.72rem'
    if (props.size === 'md') return '.85rem'
    if (props.size === 'lg') return '1rem'
  }};
  ${props => !props.disabled &&
    css`&:hover {
      background-color: rgba(0,0,0,.3);
      cursor: pointer;
      color: ${props => props.theme.colors.armyWhite};
    }
  `}
`

const StyledIcon = styled.div`
  margin-bottom: ${props => props.iconMarginless ? 0 : 2}px;
  ${props => props.label && css`
    padding-right: 8px;
  `}
`

const Label = styled.div`
`
