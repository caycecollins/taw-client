import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'
import { field } from '@cerebral/forms'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import Flatpickr from 'react-flatpickr'
import moment from 'moment-timezone'
import './dateTimePickerStyles.scss'

import ErrorMessage from './ErrorMessage'

// TODO: make sure the following is patched after rebuilding packages!!!!
// https://github.com/chmln/flatpickr/commit/6dd2adc56a71a1166c0529def27a052059f042e3#diff-51ad6ed16e74144ae6e17bbd53d35a5b

class Input extends Component {
  state = {
    inputComponent: StyledInput,
  }

  static propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    field: PropTypes.object,
    path: PropTypes.string,
    fieldChanged: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
    dateOptions: PropTypes.object,
    keyIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    is: PropTypes.string,
    innerRef: PropTypes.string,
    autoComplete: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.object,
    ]),
    placement: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    checked: PropTypes.bool,
    nomargin: PropTypes.bool,
    setFieldDefaultValue: PropTypes.func,
    userTimezone: PropTypes.string,
  }

  determineInputComponent = () => {
    switch (this.props.type) {
      case 'date': return StyledDate
      case 'select': return StyledSelect
      case 'checkbox': return StyledCheck
      case 'textarea': return StyledTextArea
      default: return StyledInput
    }
  }

  determineInputValue = () => {
    if (this.props.type === 'date') return this.props.field.value || this.props.dateOptions.minDate
    if (this.props.type === 'checkbox') return this.props.field.value
    if (this.props.type === 'typeahead') return this.props.field.value
    const inputValue = this.props.field.value || this.props.value || this.props.field.defaultValue || ''
    return inputValue
  }

  componentWillMount = () => {
    this.setState({
      inputComponent: this.props.type ? this.determineInputComponent() : StyledInput,
    })
    if (this.props.defaultValue !== undefined && this.props.value === undefined) {
      const defaultValue = this.props.type === 'date' ? moment.tz(this.props.defaultValue, this.props.userTimezone).format() : this.props.defaultValue
      this.props.setFieldDefaultValue({ field: this.props.path, value: defaultValue })
    }
  }

  updateValue = e => {
    switch (this.props.type) {
      case 'date': return e.length > 0 ? moment(moment.tz(e[0], this.props.userTimezone).toDate()).format('YYYY-MM-DDTHH:mm:00ZZ') : ''
      case 'checkbox': return e.target.checked
      default: return e.target.value
    }
  }

  onChange = e => {
    const inputValue = this.determineInputValue()
    const updatedValue = this.updateValue(e)
    if (this.props.type !== 'checkbox' && this.props.defaultValue === updatedValue) {
      this.props.fieldChanged({
        field: this.props.path,
        value: '',
      })
    } else if (updatedValue !== inputValue) {
      this.props.fieldChanged({
        field: this.props.path,
        value: updatedValue,
      })
    }
  }

  onBlur = e => {
    const inputValue = this.determineInputValue()
    const targetValue = this.props.type === 'date' ? moment.tz(e[0], this.props.userTimezone).format() : e.target.value
    if (targetValue !== inputValue) {
      this.props.fieldChanged({
        field: this.props.path,
        value: targetValue,
      })
    }
  }

  render () {
    const InputComponent = this.state.inputComponent
    return (
      <InputContainer
        isCheckboxGroup={this.props.is === 'checkbox-group'}
        placement={this.props.placement}
        nomargin={this.props.nomargin}
      >
        <InputComponentContainer
          checkbox={this.props.type === 'checkbox'}
          isCheckboxGroup={this.props.is === 'checkbox-group'}
          placement={this.props.placement}
        >
          <InputComponent
            onChange={e => !this.props.onChange ? this.onChange(e) : this.props.onChange(e)}
            onBlur={e => this.props.type !== 'date' && this.onBlur(e)}
            value={this.determineInputValue()}
            checked={this.props.type === 'checkbox' && this.determineInputValue()}
            placeholder={this.props.placeholder}
            type={this.props.type || 'text'}
            isPristine={this.props.field.isPristine || !this.props.field.hasValue}
            options={this.props.dateOptions}
            id={this.props.label}
            name={this.props.name}
            autoComplete={this.props.autoComplete}
            innerRef={this.props.innerRef}
            placement={this.props.placement}
            className={this.props.className}
            width={this.props.width}
            height={this.props.height}
          >
            {this.props.children}
          </InputComponent>
          {this.props.type === 'checkbox' && <CheckBoxLabel htmlFor={this.props.label} />}
          {this.props.label &&
            <Label
              isPristine={this.props.field.isPristine || !this.props.field.hasValue}
              placement={this.props.placement}
              className={this.props.className}
            >
              {this.props.label} {this.props.field.isRequired && <Required>*</Required>}
            </Label>
          }

        </InputComponentContainer>
        {this.props.field.errorMessage &&
          <ErrorMessage size="xs">
            {this.props.field.errorMessage}
          </ErrorMessage>
        }
      </InputContainer>
    )
  }
}

export default connect(
  {
    field: field(state`${props`path`}`),
    userTimezone: state`user.timezone`,
    fieldChanged: signal`app.fieldChanged`,
    setFieldDefaultValue: signal`app.setFieldDefaultValue`,
  },
  Input
)

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
  display: flex;
  align-items: flex-start;
  flex-direction: column-reverse;
  ${props => props.isCheckboxGroup && css`

  `}
`

const InputContainer = styled.div`
  margin-top: ${props => props.nomargin ? 0 : 24}px;
  ${props => props.isCheckboxGroup && css`
    display: inline-block;
    margin-right: 16px;
  `}
  overflow: hidden;
  @media (max-width: 600px) {
    max-width: 95%;
  }
`

const CheckBoxLabel = styled.label`
  cursor: pointer;
  background: transparent;
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 2px;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  &:after {
    opacity: 0;
    content: 'x';
    background: transparent;
    color: ${props => props.theme.colors.armyGreen};
    font-size: 1.4rem;
    margin-bottom: 2px;
  }
  &:hover {
    &::after {
      opacity: .2;
    }
  }
  min-width: 30px;
  max-width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const sharedInputStyles = css`
  padding: 4px 16px 4px 16px;
  background-color: transparent;
  color: ${props => props.isPristine ? props.theme.colors.gray : props.theme.colors.armyWhite};
  border: 1px solid ${props => props.isPristine ? props.theme.colors.gray : rgba(props.theme.colors.armyWhite, 0.7)};
  border-radius: 2px;
  font-family: industry, sans-serif;
  font-size: 1rem;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  min-width: ${props => props.width || 30}px;
  width: ${props => `${props.width}px` || 'auto'};
  min-height: ${props => props.height || 32}px;
  height: ${props => `${props.height}px` || 'auto'};
  ${props => css`
    &:focus {
      border-color: ${props.theme.colors.lightTan};
      + span {
        color: ${props.theme.colors.lightTan};;
      }
    }
  `}
  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`

const StyledInput = styled(({ placement, isPristine, innerRef, options, ...rest }) => <input {...rest} />)`
  ${sharedInputStyles}
`

const StyledTextArea = styled.textarea`
  ${sharedInputStyles}
  ${props => props && css`
    &:focus {
      border-color: ${props.theme.colors.lightTan};
    }
  `}
`

const StyledCheck = styled.input`
  visibility: hidden;
  position: absolute;
`

const StyledDate = styled(({ placement, isPristine, ...rest }) => <Flatpickr {...rest} />)`
  ${sharedInputStyles}
`

const StyledSelect = styled.select`
  ${sharedInputStyles}
  > option {
    color: ${props => props.theme.colors.armyWhite};
    background-color: ${props => props.theme.colors.darkGray5};
  }
`

export const Label = styled.span`
  font-size: 0.9rem;
  margin-bottom: 4px;
  text-transform: capitalize;
  color: ${props => props.isPristine ? props.theme.colors.gray : 'inherit'};
  transition: all .3s cubic-bezier(.4,0,.2,1);
  ${props => props.placement && css`
    display: flex;
    align-items: center;
    font-weight: 300;
    text-transform: uppercase;
  `}
`

const Required = styled.div`
  display: inline-block;
  color: ${props => props.theme.colors.lightRed};
  margin-left: 4px;
`
