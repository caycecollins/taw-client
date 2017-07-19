import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import { form } from '@cerebral/forms'
import moment from 'moment-timezone'

import Button from '../Button'
import Input from '../Input'

const getFields = props => Object.keys(props.form.getFields()) || []

const formPath = 'event.scheduleEventForm'

const roundDate = (date, duration, method) => moment(Math[method]((+date) / (+duration)) * (+duration))

const setDefaultDate = (props, field) => {
  const roundedStart = roundDate(moment(), moment.duration(15, 'minutes'), 'ceil')
  const roundedEnd = roundDate(moment(), moment.duration(75, 'minutes'), 'ceil')
  switch (field) {
    case 'start': return props.setFieldDefaultValue({ field: `${formPath}.${field}`, value: moment(roundedStart).tz(props.userTimezone).format() })
    case 'end': return props.setFieldDefaultValue({ field: `${formPath}.${field}`, value: moment(roundedEnd).tz(props.userTimezone).format() })
    default: return null
  }
}

const dateConfigOptions = (props, field) => {
  return {
    allowInput: true,
    enableTime: true,
    time_24hr: !!props.userHourFormat || true,
    minDate: moment().tz(props.userTimezone).format(),
  }
}

const selectOptions = (props, field) => {
  const options = ['one', 'two', 'three']
  const updatedOptions = options.map((option, index) => {
    return (
      <option
        key={`${field}-${index}`}
        value={option}
      >
        {option}
      </option>
    )
  })
  updatedOptions.unshift(<option key="empty" value="">Select...</option>)
  return updatedOptions
}

const setDefaultValue = (props, field) => {
  switch (field) {
    case 'repeat': return `${field}-2`
    case 'type': return `${field}-2`
  }
}

const submitForm = (props, e) => {
  e.preventDefault()
  props.form.isValid && props.submitForm()
}

const CreateEvent = props => {
  return (
    <CreateEventContainer>
      <form onSubmit={e => e.preventDefault()}>
        {getFields(props).map((field, index) => {
          const fieldType = props.form[field].type
          return (
            <Input
              type={fieldType}
              options={fieldType === 'select' && selectOptions(props, field)}
              name={field}
              key={index}
              keyIndex={index}
              path={`${formPath}.${field}`}
              dateOptions={fieldType === 'date' ? dateConfigOptions(props, field) : {}}
              defaultDate={fieldType === 'date' ? setDefaultDate(props, field) : {}}
              value={fieldType === 'select' ? setDefaultValue(props, field) : null}
            />
          )
        })}
        <br />
        <br />
        <Button
          onClick={() => props.resetForm({ formPath })}
          label="Reset"
          type="button"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={e => submitForm(props, e)}
          disabled={!props.form.isValid || props.formSaving}
          label={props.formSaving ? 'Saving...' : 'Save'}
          type="submit"
          icon={props.formSaving && 'crosshairs'}
          iconSpin={props.formSaving && true}
        />
      </form>
    </CreateEventContainer>
  )
}

CreateEvent.propTypes = {
  form: PropTypes.object,
  userTimezone: PropTypes.string,
  formSaving: PropTypes.bool,
  submitForm: PropTypes.func,
  resetForm: PropTypes.func,
  setFieldDefaultValue: PropTypes.func,
}

CreateEvent.defaultProps = {
}

export default connect(
  {
    form: form(state`event.scheduleEventForm`),
    userTimezone: state`user.timezone`,
    userTimezoneText: state`user.timezoneText`,
    submitForm: signal`event.creating`,
    formSaving: state`event.scheduleEventForm.updating`,
    resetForm: signal`app.onReset`,
    setFieldDefaultValue: signal`app.setFieldDefaultValue`,
    userHourFormat: state`user.timeformat`,
  },
  CreateEvent
)

const CreateEventContainer = styled.div`
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
