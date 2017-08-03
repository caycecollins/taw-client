import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'

const QuickUnitActions = props =>
  <Container>
  </Container>

QuickUnitActions.propTypes = {
  user: PropTypes.object,
}

export default connect(
  {
  },
  QuickUnitActions
)

const Container = styled.div`
`
