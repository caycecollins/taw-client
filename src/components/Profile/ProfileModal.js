import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import { form } from '@cerebral/forms'

import Button from '../Button'
import Input from '../Input'
import timezonesFromJson from '../Events/timezones.json'

function EditProfile (props) {
  const timezones = timezonesFromJson.map((timezone, index) => {
    if (!timezone.utc) return
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
  const fields = Object.keys(props.form.getFields())
  const filterTzForText = timezonesFromJson.filter(tz => tz.utc && tz.utc[0] === props.userTimezone)
  const timezoneText = filterTzForText[0].text
  return (
    <EditProfileContainer>
      <b>EDIT PROFILE</b>
      <br />
      <br />
      Raw current user timezone: {props.userTimezone}
      <br />
      Current user timezone: {timezoneText}
      <br />
      <form onSubmit={(e) => e.preventDefault()}>
        {fields.length > 0 && props.userTimezone && fields.map((field, index) => {
          if (props.form[field].type === 'select') {
            return (
              <Input
                type="select"
                value={props.userTimezone}
                name={field}
                key={index}
                path={`profile.editForm.${field}`}
              >
                {field === 'timezone' && timezones}
              </Input>
            )
          }
          return (
            <Input
              type={props.form[field].type}
              name={field}
              key={index}
              path={`profile.editForm.${field}`}
            />
          )
        })}
        <br />
        <br />
        <Button
          onClick={e => props.resetForm({ formPath: 'profile.editForm' })}
          label="Reset"
          type="button"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={e => {
            e.preventDefault()
            !props.form.isPristine && props.form.isValid && props.updateProfile()
          }}
          disabled={!props.form.isValid || props.profileUpdating}
          label={props.profileUpdating ? 'Saving...' : 'Save'}
          type="submit"
          icon={props.profileUpdating && 'crosshairs'}
          iconSpin={props.profileUpdating && true}
        />
      </form>
    </EditProfileContainer>
  )
}

EditProfile.propTypes = {
  form: PropTypes.object,
  userTimezone: PropTypes.string,
  profileUpdating: PropTypes.bool,
  updateProfile: PropTypes.func,
  resetForm: PropTypes.func,
  setFieldDefaultValue: PropTypes.func,
}

EditProfile.defaultProps = {
}

export default connect(
  {
    form: form(state`profile.editForm`),
    userTimezone: state`user.timezone`,
    userTimezoneText: state`user.timezoneText`,
    profileUpdating: state`profile.updating`,
    updateProfile: signal`profile.updated`,
    resetForm: signal`app.onReset`,
    setFieldDefaultValue: signal`app.setFieldDefaultValue`,
  },
  EditProfile
)

const EditProfileContainer = styled.div`
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
