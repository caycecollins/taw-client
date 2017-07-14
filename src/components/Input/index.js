import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, props, signal } from 'cerebral/tags'
import { field } from '@cerebral/forms'
import styled from 'styled-components'

import ErrorMessage from './ErrorMessage'

function Input ({ name, type, label, field, path, placeholder, settings, fieldChanged }) {
  function onChange (e) {
    fieldChanged({
      field: path,
      value: e.target.value,
      settingsField: 'app.settings.validateOnChange',
    })
  }
  function onBlur (e) {
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
      <StyledInput
        onChange={e => onChange(e)}
        onBlur={e => onBlur(e)}
        value={field.value}
        placeholder={placeholder}
        type={type}
      />
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

const StyledInput = styled.input`
  padding: 6px 16px 4px 16px;
  background-color: transparent;
  color: ${props => props.theme.colors.gray};
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 2px;
  font-family: industry, sans-serif;
  font-size: 1rem;
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
