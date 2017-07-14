import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'

import ViewContainer from '../ViewContainer'
import Button from '../Button'

function Profile (props) {
  return (
    <ViewContainer backgroundImage="/images/profile-bg.jpg">
      Profile
      <br />
      <br />
      <br />
      <Button
        onClick={() => props.editProfile()}
        icon="edit"
        label="Edit Profile"
      />
    </ViewContainer>
  )
}

Profile.propTypes = {
  editProfile: PropTypes.func,
}

export default connect(
  {
    editProfile: signal`profile.opened`,
  },
  Profile
)
