import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import { form, field } from '@cerebral/forms'
import moment from 'moment-timezone'

import Button from '../Button'
import Input from '../Input'

const formPath = 'event.scheduleEventForm'

const roundDate = (date, duration, method, userTimezone) => {
  const rounded = moment(Math[method]((+date) / (+duration)) * (+duration))
  const converted = moment(rounded).tz(userTimezone).toDate()
  return converted
}

const dateConfigOptions = (props, field) => {
  const options = {
    allowInput: true,
    enableTime: true,
    time_24hr: !!props.userHourFormat || true,
    minDate: moment().tz(props.userTimezone).format(),
    defaultDate: roundDate(moment(), moment.duration(30, 'minutes'), 'ceil', props.userTimezone),
  }
  if (field === 'start') options.defaultDate = roundDate(moment(), moment.duration(30, 'minutes'), 'ceil', props.userTimezone)
  if (field === 'end') options.defaultDate = roundDate(moment(), moment.duration(90, 'minutes'), 'ceil', props.userTimezone)
  return options
}

const handleSubmitForm = (props, e) => {
  e.preventDefault()
  props.form.isValid && props.submitForm()
}

const SubmitButton = connect(
  {
    form: form(state`event.scheduleEventForm`),
    submitForm: signal`event.creating`,
    formSaving: state`event.creating`,
  },
  props =>
    <Button
      onClick={e => handleSubmitForm(props, e)}
      disabled={!props.form.isValid || props.formSaving}
      label={props.formSaving ? 'Saving...' : 'Save'}
      type="submit"
      icon={props.formSaving && 'crosshairs'}
      iconSpin={props.formSaving && true}
    />
)

const CreateEvent = props => {
  return (
    <CreateEventContainer>
      <form onSubmit={e => e.preventDefault()}>
        <Input
          label="name"
          path={`${formPath}.name`}
        />
        <Input
          label="description"
          path={`${formPath}.description`}
        />
        <Input
          label="mandatory"
          type="checkbox"
          path={`${formPath}.mandatory`}
        />
        <Input
          label="start"
          type="date"
          path={`${formPath}.start`}
          dateOptions={dateConfigOptions(props, 'start')}
        />
        <Input
          label="end"
          type="date"
          path={`${formPath}.end`}
          dateOptions={dateConfigOptions(props, 'end')}
        />
        <Input
          label="repeat"
          type="checkbox"
          path={`${formPath}.repeat`}
        />
        {props.repeatEnabled && ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((weekday, index) =>
          <Input
            key={`repeat-${weekday}`}
            label={weekday}
            name="repeatWeekday"
            type="checkbox"
            is="checkbox-group"
            path={`${formPath}.repeatWeekly.${weekday}`}
            value={weekday}
          />
        )}
        <br />
        <br />
        <br />
        <Button
          onClick={() => props.resetForm({ formPath })}
          label="Reset"
          type="button"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <SubmitButton />
      </form>
    </CreateEventContainer>
  )
}

CreateEvent.propTypes = {
  userTimezone: PropTypes.string,
  formSaving: PropTypes.bool,
  submitForm: PropTypes.func,
  resetForm: PropTypes.func,
  setFieldDefaultValue: PropTypes.func,
  repeatEnabled: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
}

export default connect(
  {
    userTimezone: state`user.timezone`,
    userTimezoneText: state`user.timezoneText`,
    resetForm: signal`app.onReset`,
    setFieldDefaultValue: signal`app.setFieldDefaultValue`,
    userHourFormat: state`user.timeformat`,
    repeatEnabled: state`${formPath}.repeat.value`,
  },
  CreateEvent
)

const CreateEventContainer = styled.div`
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
