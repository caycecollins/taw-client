import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal } from 'cerebral/tags'

import Button from '../Button'

const ProfileInfo = props => {
  return (
    <Container>
      <Button
        onClick={() => props.editProfileClicked()}
        icon="edit"
        label="Edit Profile"
      />
    </Container>
  )
}

ProfileInfo.propTypes = {
  editProfileClicked: PropTypes.func,
}

export default connect(
  {
    editProfileClicked: signal`profile.editProfileClicked`,
  },
  ProfileInfo
)

const Container = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
