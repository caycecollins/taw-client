import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, props, signal } from 'cerebral/tags'
import { field } from '@cerebral/forms'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'

import ErrorMessage from './ErrorMessage'

function Input ({ value, children, name, type, label, field, path, placeholder, settings, fieldChanged }) {
  const inputValue = field.value || value || field.defaultValue
  const InputType = type === 'select' ? StyledSelect : StyledInput
  function onChange (e) {
    e.target.value !== inputValue &&
      fieldChanged({
        field: path,
        value: e.target.value,
        settingsField: 'app.settings.validateOnChange',
      })
  }
  function onBlur (e) {
    e.target.value !== inputValue &&
      fieldChanged({
        field: path,
        value: e.target.value,
        settingsField: 'app.settings.validateInputOnBlur',
      })
  }
  function renderError () {
    const { errorMessage } = field
    const { showErrors } = settings
    return (
      <ErrorMessage size="xs">
        {showErrors && errorMessage}
      </ErrorMessage>
    )
  }
  return (
    <InputContainer>
      {label && <Label>{name} {field.isRequired ? <Required>*</Required> : ''}</Label>}
      <InputType
        onChange={e => onChange(e)}
        onBlur={e => onBlur(e)}
        value={inputValue}
        placeholder={placeholder}
        type={type}
        isPristine={field.isPristine}
      >
        {children}
      </InputType>
      {renderError()}
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

const sharedInputStyles = css`
  padding: 6px 16px 4px 16px;
  background-color: transparent;
  color: ${props => !props.isPristine ? props.theme.colors.armyWhite : props.theme.colors.gray};
  border: 1px solid ${props => !props.isPristine ? rgba(props.theme.colors.armyWhite, 0.7) : props.theme.colors.gray};
  border-radius: 2px;
  font-family: industry, sans-serif;
  font-size: 1rem;
`

const StyledInput = styled.input`
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
`

const Required = styled.div`
  display: inline-block;
  color: ${props => props.theme.colors.lightRed};
`
