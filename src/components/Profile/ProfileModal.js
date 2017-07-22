import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'

import Form from '../Form'
import SubmitButton from '../Form/SubmitButton'
import Button from '../Button'
import Input from '../Input'
import timezonesFromJson from '../Events/timezones.json'

const formPath = 'profile.editForm'

const timezones = timezonesFromJson.map((timezone, index) => {
  if (!timezone.utc) return false
  return (
    <option
      key={index}
      value={timezone.utc[0]}
    >
      {timezone.text}
    </option>
  )
})

timezones.unshift(<option key="empty" value="">Select your timezone</option>)

// const getUserTimezoneText = userTimezone => timezonesFromJson.filter(tz => tz.utc && tz.utc[0] === userTimezone)

const EditProfile = props => {
  return (
    <EditProfileContainer>
      <b>EDIT PROFILE</b>
      <br />
      {/* <br />
      Raw current user timezone: {props.userTimezone}
      <br />
      Current user timezone: {getUserTimezoneText(props.userTimezone)[0].text} */}
      <br />
      <Form>
        <Input
          type="select"
          value={props.userTimezone}
          label="timezone"
          path={`${formPath}.timezone`}
        >
          {timezones}
        </Input>
        <br />
        <br />
        <Button
          onClick={e => props.resetForm({ formPath })}
          label="Reset"
          type="button"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <SubmitButton form={formPath} />
      </Form>
    </EditProfileContainer>
  )
}

EditProfile.propTypes = {
  userTimezone: PropTypes.string,
  resetForm: PropTypes.func,
}

EditProfile.defaultProps = {
}

export default connect(
  {
    userTimezone: state`user.timezone`,
    resetForm: signal`app.onReset`,
  },
  EditProfile
)

const EditProfileContainer = styled.div`
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
