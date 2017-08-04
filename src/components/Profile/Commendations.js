import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'

const ProfileCommendations = props => {
  return (
    <Container>

    </Container>
  )
}

ProfileCommendations.propTypes = {
}

ProfileCommendations.defaultProps = {
}

export default connect(
  {
  },
  ProfileCommendations
)

const Container = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
