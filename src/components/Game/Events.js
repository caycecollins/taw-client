import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

const Events = props => {
  return (
    <Container>
      Events
    </Container>
  )
}

Events.propTypes = {
}

Events.defaultProps = {
}

export default connect(
  {
  },
  Events
)

const Container = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
