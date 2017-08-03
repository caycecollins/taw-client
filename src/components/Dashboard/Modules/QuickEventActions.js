import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'

const QuickEventActions = props =>
  <Container>
  </Container>

QuickEventActions.propTypes = {
  user: PropTypes.object,
}

export default connect(
  {
  },
  QuickEventActions
)

const Container = styled.div`
`
