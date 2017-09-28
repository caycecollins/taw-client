import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

const Forums = props => {
  return (
    <Container>
      Forums
    </Container>
  )
}

Forums.propTypes = {
}

Forums.defaultProps = {
}

export default connect(
  {
  },
  Forums
)

const Container = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
