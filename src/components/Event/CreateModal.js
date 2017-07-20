import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import moment from 'moment-timezone'

import Form from '../Form'
import SubmitButton from '../Form/SubmitButton'
import Button from '../Button'
import Input from '../Input'
import ErrorMessage from '../Input/ErrorMessage'

const formPath = 'event.createEventForm'

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

const CreateEvent = props => {
  return (
    <CreateEventContainer>
      <Form>
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
        <SubmitButton form={formPath} />
      </Form>
      <br />
      {props.underConstruction && <ErrorMessage>Under construciton, check back soon.</ErrorMessage>}
    </CreateEventContainer>
  )
}

CreateEvent.propTypes = {
  userTimezone: PropTypes.string,
  userHourFormat: PropTypes.string,
  resetForm: PropTypes.func,
  repeatEnabled: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  underConstruction: PropTypes.bool,
}

export default connect(
  {
    userTimezone: state`user.timezone`,
    resetForm: signal`app.onReset`,
    userHourFormat: state`user.timeformat`,
    repeatEnabled: state`${formPath}.repeat.value`,
    underConstruction: state`${formPath}.underConstruction`,
  },
  CreateEvent
)

const CreateEventContainer = styled.div`
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
