import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

import Form from '../Form'
import Input from '../Input'
import timezonesFromJson from '../Events/timezones.json'

const formPath = 'profile.editProfileForm'

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

const EditProfileSidebar = props => {
  return (
    <Container>
      <Form>
        <Input
          type="select"
          value={props.userTimezone}
          label="timezone"
          path={`${formPath}.timezone`}
          defaultValue={props.userTimezone}
        >
          {timezones}
        </Input>
      </Form>
    </Container>
  )
}

EditProfileSidebar.propTypes = {
  userTimezone: PropTypes.string,
}

EditProfileSidebar.defaultProps = {
}

export default connect(
  {
    userTimezone: state`user.timezone`,
  },
  EditProfileSidebar
)

const Container = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
