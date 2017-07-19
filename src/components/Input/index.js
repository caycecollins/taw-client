import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, props, signal } from 'cerebral/tags'
import { field } from '@cerebral/forms'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import Flatpickr from 'react-flatpickr'
import moment from 'moment-timezone'
import './dateStyles.scss'

import ErrorMessage from './ErrorMessage'

// TODO: make sure the following is patched when rebuilding packages!!!!
// https://github.com/chmln/flatpickr/commit/6dd2adc56a71a1166c0529def27a052059f042e3#diff-51ad6ed16e74144ae6e17bbd53d35a5b

const determineInputValue = props => {
  const inputValue = props.field.value || props.value || props.field.defaultValue || ''
  return inputValue
}

const onChange = (props, e) => {
  const inputValue = determineInputValue(props)
  const determineValue = () => {
    switch (props.type) {
      case 'date': return moment(moment.tz(e[0], props.userTimezone).toDate()).format()
      case 'checkbox': return e.target.checked
      case 'text': return e.target.value
      default: return e.target.value
    }
  }
  const targetValue = determineValue()
  targetValue !== inputValue &&
    props.fieldChanged({
      field: props.path,
      value: targetValue,
      settingsField: 'app.settings.validateOnChange',
    })
}

const onBlur = (props, e) => {
  const inputValue = determineInputValue(props)
  const targetValue = props.type === 'date' ? moment.tz(e[0], props.userTimezone).format() : e.target.value
  targetValue !== inputValue &&
    props.fieldChanged({
      field: props.path,
      value: targetValue,
      settingsField: 'app.settings.validateInputOnBlur',
    })
}

const renderError = props =>
  <ErrorMessage size="xs">
    {props.field.errorMessage}
  </ErrorMessage>

renderError.propTypes = { field: PropTypes.object }

const determineInputComponent = props => {
  switch (props.type) {
    case 'date': return StyledDate
    case 'select': return StyledSelect
    case 'checkbox': return StyledCheck
    default: return StyledInput
  }
}

const Input = props => {
  const InputComponent = props.type ? determineInputComponent(props) : StyledInput
  return (
    <InputContainer>
      {props.label &&
        <Label isPristine={props.field.isPristine || !props.field.hasValue}>
          {props.name} {props.field.isRequired && <Required>*</Required>}
        </Label>
      }
      <InputComponentContainer checkbox={props.type === 'checkbox'}>
        <InputComponent
          onChange={e => onChange(props, e)}
          onBlur={e => props.type !== 'date' && onBlur(props, e)}
          value={determineInputValue(props)}
          checked={props.type === 'checkbox' && determineInputValue(props)}
          placeholder={props.placeholder}
          type={props.type || 'text'}
          isPristine={props.field.isPristine || !props.field.hasValue}
          options={props.dateOptions}
          id={`checkbox-${props.keyIndex}`}
        >
          {props.type === 'select' ? props.options || props.children : props.children}
        </InputComponent>
        {props.type === 'checkbox' && <CheckBoxLabel htmlFor={`checkbox-${props.keyIndex}`} />}
      </InputComponentContainer>
      {renderError(props)}
    </InputContainer>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  field: PropTypes.object,
  path: PropTypes.string,
  settings: PropTypes.object,
  fieldChanged: PropTypes.func,
  label: PropTypes.bool,
  placeholder: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.string,
  dateOptions: PropTypes.object,
  keyIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  options: PropTypes.node,
}

Input.defaultProps = {
  label: true,
}

export default connect(
  {
    field: field(state`${props`path`}`),
    settings: state`app.settings`,
    fieldChanged: signal`app.fieldChanged`,
  },
  Input
)

const InputContainer = styled.div`
  margin-top: 16px;
`

const InputComponentContainer = styled.div`
  ${props => props.checkbox && css`
    position: relative;
    input[type=checkbox] {
      &:checked + label {
        border: 1px solid ${props => props.theme.colors.armyWhite};
        &:after {
          opacity: 1;
        }
      }
    }
  `}
`

const CheckBoxLabel = styled.label`
  cursor: pointer;
  padding: 3px 7px 0px 6px;
  background: transparent;
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 2px;
  &:after {
    opacity: 0;
    content: 'x';
    background: transparent;
    color: ${props => props.theme.colors.armyGreen};
    font-size: 1.4rem;
  }
  &:hover {
    &::after {
      opacity: .5;
    }
  }
`

const sharedInputStyles = css`
  padding: 6px 16px 4px 16px;
  background-color: transparent;
  color: ${props => props.isPristine ? props.theme.colors.gray : props.theme.colors.armyWhite};
  border: 1px solid ${props => props.isPristine ? props.theme.colors.gray : rgba(props.theme.colors.armyWhite, 0.7)};
  border-radius: 2px;
  font-family: industry, sans-serif;
  font-size: 1rem;
  transition: all .3s cubic-bezier(.4,0,.2,1);
`
const StyledInput = styled.input`
  ${sharedInputStyles}
`

const StyledCheck = styled.input`
  visibility: hidden;
  position: absolute;
`

const StyledDate = styled(({ isPristine, ...rest }) => <Flatpickr {...rest} />)`
  ${sharedInputStyles}
`

const StyledSelect = styled.select`
  ${sharedInputStyles}
  > option {
    background-color: ${props => props.theme.colors.darkGray5};
  }
`

const Label = styled.div`
  font-size: 0.9rem;
  margin-bottom: 4px;
  text-transform: capitalize;
  color: ${props => props.isPristine ? props.theme.colors.gray : 'inherit'};
`

const Required = styled.div`
  display: inline-block;
  color: ${props => props.theme.colors.lightRed};
`
