import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import moment from 'moment-timezone'
import { Grid, Row, Col } from 'react-material-responsive-grid'
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'

import Form from '../Form'
import Input from '../Input'
import Button from '../Button'
import TypeAhead from '../Input/TypeAhead'

const formPath = 'events.editEventForm'

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

const searchOnChange = (props, e) => {
  props.searchParticipantsChanged({ form: formPath, value: e.target ? e.target.value : e })
}

const getDuration = props => {
  let difference = moment(props.endDate).diff(moment(props.startDate))
  let duration = moment.duration(difference)
  let durationDisplay = ''
  if (duration.days() > 0) durationDisplay += duration.days() + 'd '
  if (duration.hours() > 0) durationDisplay += duration.hours() + 'h '
  if (duration.minutes() > 0) durationDisplay += duration.minutes() + 'm'
  if (durationDisplay) return 'Duration: ' + durationDisplay
}

const getUserUnits = props => {
  const units = props.divisions.map((unit, index) => {
    return (
      <option
        key={index}
        value={unit.id}
      >
        {unit.name}
      </option>
    )
  })
  units.unshift(<option key="empty" value="">Select Unit</option>)
  return units
}

const EventEditTab = props => {
  const duration = (props.startDate && props.endDate) && getDuration(props)
  return (
    <Container>
      <Form>
        <Grid marginless>
          <StyledRow>
            <Col xs4={4}>
              <Button
                onClick={() => console.log('handle-delete-event')}
                icon="trash"
                label="Delete Event"
                danger
              />
            </Col>
          </StyledRow>
          <StyledRow>
            <Col sm={6} sm8={4} xs4={4}>
              <Input
                label="title"
                path={`${formPath}.title`}
                width={300}
                defaultValue={props.event.title}
              />
              <Input
                label="description"
                type="textarea"
                path={`${formPath}.description`}
                width={300}
                height={100}
                defaultValue={props.event.description}
              />
              <Input
                label="mandatory"
                type="checkbox"
                path={`${formPath}.mandatory`}
                defaultValue={props.event.mandatory}
              />
              <Input
                label="start date"
                type="date"
                path={`${formPath}.start`}
                dateOptions={dateConfigOptions(props, 'start')}
                defaultValue={props.event.start}
              />
              <Input
                label="end date"
                type="date"
                path={`${formPath}.end`}
                dateOptions={dateConfigOptions(props, 'end')}
                defaultValue={props.event.end}
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
                defaultValue={props.event.recurring && props.event.recurring.length > 0}
              />
              {props.repeatEnabled && ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday, index) =>
                <Input
                  key={`repeatWeekly${weekday}`}
                  label={weekday}
                  name="repeatWeekday"
                  type="checkbox"
                  is="checkbox-group"
                  path={`${formPath}.repeatWeekly${weekday}`}
                  defaultValue={props.event.recurring.indexOf(index) > -1}
                />
              )}
            </Col>
            <Col sm={6} sm8={4}>
              <Input
                type="select"
                label="Hosting Unit"
                path={`${formPath}.unit`}
                defaultValue={props.event.hoster.id}
              >
                {props.divisions && getUserUnits(props)}
              </Input>
              <TypeAhead
                label="Invite Member or Unit"
                autoComplete="off"
                items={props.search && props.search.map(it => ({ key: it.id, value: it.name || it.callsign, type: it.callsign ? 'user' : 'unit', exists: it.exists }))}
                onChange={e => searchOnChange(props, e)}
                onSelect={e => props.addParticipantClicked({ path: formPath, participant: e })}
                spellCheck="false"
                size="100%"
              />
              <Participants>
                {props.participants && props.participants.length > 0 && props.participants.map((participant, index) =>
                  <Participant key={index}>
                    <div>{participant.display}</div>
                    <RemoveParticipantButton
                      onClick={e => props.removeParticipantClicked({ path: formPath, participant })}
                      icon="remove"
                      outline={false}
                    />
                  </Participant>
                )}
              </Participants>
            </Col>
          </StyledRow>
        </Grid>
      </Form>
    </Container>
  )
}

EventEditTab.propTypes = {
  event: PropTypes.object,
  sidebarView: PropTypes.string,
  sidebarTab: PropTypes.string,
  userTimezone: PropTypes.string,
  userUnitID: PropTypes.number,
  userHourFormat: PropTypes.string,
  repeatEnabled: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  searchParticipantsChanged: PropTypes.func,
  divisions: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  fieldChanged: PropTypes.func,
  search: PropTypes.array,
  participants: PropTypes.array,
  addParticipantClicked: PropTypes.func,
  removeParticipantClicked: PropTypes.func,
}

export default connect(
  {
    sidebarView: state`app.sidebarView`,
    sidebarTab: state`app.sidebarTab`,
    event: state`events.eventData`,
    userTimezone: state`user.timezone`,
    userUnitID: state`user.highestPosition.unit.id`,
    startDate: state`${formPath}.start.value`,
    endDate: state`${formPath}.end.value`,
    divisions: state`units.divisions`,
    search: state`search.results`,
    userHourFormat: state`user.timeformat`,
    repeatEnabled: state`${formPath}.repeat.value`,
    participants: state`${formPath}.participants`,
    searchParticipantsChanged: signal`events.searchParticipantsChanged`,
    fieldChanged: signal`app.fieldChanged`,
    addParticipantClicked: signal`events.addParticipantClicked`,
    removeParticipantClicked: signal`events.removeParticipantClicked`,
  },
  EventEditTab
)

const Container = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`

const StyledRow = styled(Row)`
  overflow: hidden;
`

const Duration = styled.div`
  padding: 16px 0;
  color: ${props => props.theme.colors.gray};
`

const Participants = styled.div`
  margin-top: 24px;
  width: 100%;
`

const Participant = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 32px;
  padding: 8px 16px;
  color: ${props => props.theme.colors.tan};
  &:hover {
    background-color: ${props => props.theme.colors.darkGray2};
  }
`

const RemoveParticipantButton = styled(Button)`
  color: ${props => props.theme.colors.darkGray6};
  &:hover {
    color: ${props => props.theme.colors.lightRed};
    background-color: transparent;
  }
`
