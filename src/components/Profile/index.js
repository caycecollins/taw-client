import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { signal } from 'cerebral/tags'

import ViewContainer from '../ViewContainer'
import Button from '../Button'

const Profile = props =>
  <ViewContainer backgroundImage="/images/profile-bg.jpg">
    Profile
    <br />
    <br />
    <br />
    <Button
      onClick={() => props.editProfileClicked()}
      icon="edit"
      label="Edit Profile"
    />
  </ViewContainer>

Profile.propTypes = {
  editProfileClicked: PropTypes.func,
}

export default connect(
  {
    editProfileClicked: signal`profile.editProfileClicked`,
  },
  Profile
)
