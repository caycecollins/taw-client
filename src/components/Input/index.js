import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, props, signal } from 'cerebral/tags'
import { field } from '@cerebral/forms'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'

import ErrorMessage from './ErrorMessage'

const onChange = (props, e) => {
  const inputValue = props.field.value || props.value || props.field.defaultValue
  e.target.value !== inputValue &&
  props.fieldChanged({
    field: props.path,
    value: e.target.value,
    settingsField: 'app.settings.validateOnChange',
  })
}

const onBlur = (props, e) => {
  const inputValue = props.field.value || props.value || props.field.defaultValue
  e.target.value !== inputValue &&
    props.fieldChanged({
      field: props.path,
      value: e.target.value,
      settingsField: 'app.settings.validateInputOnBlur',
    })
}

const renderError = props =>
  <ErrorMessage size="xs">
    {props.field.errorMessage}
  </ErrorMessage>

renderError.propTypes = { field: PropTypes.object }

const Input = props => {
  const InputType = props.type === 'select' ? StyledSelect : StyledInput
  return (
    <InputContainer>
      {props.label &&
        <Label>
          {props.name} {props.field.isRequired
            ? <Required>*</Required>
            : '&nbsp;'
          }
        </Label>
      }
      <InputType
        onChange={e => onChange(props, e)}
        onBlur={e => onBlur(props, e)}
        value={props.field.value || props.value || props.field.defaultValue}
        placeholder={props.placeholder}
        type={props.type}
        isPristine={props.field.isPristine}
      >
        {props.children}
      </InputType>
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
