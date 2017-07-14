import React from 'react'
// import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { connect } from 'cerebral/react'
// import { signal, state } from 'cerebral/tags'
import moment from 'moment-timezone'
// import { rgba } from 'polished'

const timezonesFromJson = require('../Events/timezones.json')
const timezones = timezonesFromJson.map((timezone, index) => {
  return (
    <option key={index} value={timezone.utc && timezone.utc[0]}>{timezone.text}</option>
  )
})

function EditProfile (props) {
  return (
    <EditProfileContainer>
      Edit Profile
      <br />
      <br />
      <br />
      <select>{timezones}</select>
    </EditProfileContainer>
  )
}

EditProfile.propTypes = {
}

EditProfile.defaultProps = {
}

export default connect(
  {
  },
  EditProfile
)

const EditProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-sizeE: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
