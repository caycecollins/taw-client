import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import moment from 'moment-timezone'
import { Grid, Row, Col } from 'react-material-responsive-grid'
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'

import Form from '../Form'
import SubmitButton from '../Form/SubmitButton'
import Button from '../Button'
import Input from '../Input'
import TypeAhead from '../Input/TypeAhead'
import ErrorMessage from '../Input/ErrorMessage'

const formPath = 'events.createEventForm'

const roundDate = (date, duration, method, userTimezone) => {
  const rounded = moment(Math[method]((+date) / (+duration)) * (+duration))
  const converted = moment(rounded).tz(userTimezone).toDate()
  return converted
}

const dateConfigOptions = (props, field) => {
  const options = {
    enableTime: true,
    time_24hr: !!props.userHourFormat || true,
    plugins: [new confirmDatePlugin({
      showAlways: false,
      confirmIcon: '<i class="fa fa-check"></i>',
      confirmText: 'Done',
    })],
  }
  if (field === 'start') {
    options.minDate = roundDate(moment(), moment.duration(15, 'minutes'), 'ceil', props.userTimezone)
  }
  if (field === 'end') {
    options.minDate = props.startDate ? moment(props.startDate).add(15, 'minutes').format() : roundDate(moment(), moment.duration(30, 'minutes'), 'ceil', props.userTimezone)
    // prevent end date/time existing prior to start date/time
    if (props.startDate) {
      let difference = 0
      if (props.endDate) {
        difference = moment(props.endDate).diff(moment(props.startDate))
      }
      if (difference < 900000) {
        props.fieldChanged({
          field: `${formPath}.end`,
          value: options.minDate,
        })
      }
    }
  }
  return options
}

const hostingUnitOnChange = (props, e) => {
  props.filterHostingUnitInput({ value: e.target.value })
}

const searchOnChange = (props, e) => {
  props.filterSearchInput({ value: e.target.value })
}

const getDuration = props => {
  var difference = moment(props.endDate).diff(moment(props.startDate))
  var duration = moment.duration(difference)
  let durationDisplay = ''
  if (duration.days() > 0) durationDisplay += duration.days() + 'd '
  if (duration.hours() > 0) durationDisplay += duration.hours() + 'h '
  if (duration.minutes() > 0) durationDisplay += duration.minutes() + 'm'
  if (durationDisplay) return 'Duration: ' + durationDisplay
}

const CreateEvent = props => {
  const duration = (props.startDate && props.endDate) && getDuration(props)
  return (
    <CreateEventContainer>
      <Form>
        <Grid>
          <Row>
            <Col sm={6} sm8={4} xs4={4}>
              <Input
                label="title"
                path={`${formPath}.title`}
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
                label="start date"
                type="date"
                path={`${formPath}.start`}
                dateOptions={dateConfigOptions(props, 'start')}
              />
              <Input
                label="end date"
                type="date"
                path={`${formPath}.end`}
                dateOptions={dateConfigOptions(props, 'end')}
              />
              {duration &&
                <Duration>
                  {duration}
                </Duration>
              }
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
            </Col>
            <Col sm={6} sm8={4}>
              <TypeAhead
                label="Division Search Test"
                autoComplete="off"
                items={props.divisions && props.divisions.map(it => ({ key: it.id, value: it.name }))}
                onChange={e => hostingUnitOnChange(props, e)}
                spellCheck="false"
              />
              <TypeAhead
                label="Member or Unit Search Test"
                autoComplete="off"
                items={props.search && props.search.map(it => ({ key: it.id, value: it.name || it.callsign, type: it.callsign ? 'user' : 'unit' }))}
                onChange={e => searchOnChange(props, e)}
                onSelect={e => console.log(e)}
                spellCheck="false"
              />
            </Col>
          </Row>
          <Row>
            <Button
              onClick={() => props.resetForm({ formPath })}
              label="Reset"
              type="button"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <SubmitButton form={formPath} />
            {props.underConstruction && <ErrorMessage>Under construciton, check back soon.</ErrorMessage>}
          </Row>
        </Grid>
      </Form>
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
  filterHostingUnitInput: PropTypes.func,
  filterSearchInput: PropTypes.func,
  divisions: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  fieldChanged: PropTypes.func,
}

export default connect(
  {
    userTimezone: state`user.timezone`,
    startDate: state`${formPath}.start.value`,
    endDate: state`${formPath}.end.value`,
    divisions: state`units.divisions`,
    search: state`search.results`,
    userHourFormat: state`user.timeformat`,
    repeatEnabled: state`${formPath}.repeat.value`,
    underConstruction: state`${formPath}.underConstruction`,
    resetForm: signal`app.onReset`,
    filterHostingUnitInput: signal`events.filterHostingUnitInput`,
    filterSearchInput: signal`events.filterSearchInput`,
    fieldChanged: signal`app.fieldChanged`,
  },
  CreateEvent
)

const CreateEventContainer = styled.div`
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`

const Duration = styled.div`
  padding: 16px 0;
  color: ${props => props.theme.colors.gray};
`
