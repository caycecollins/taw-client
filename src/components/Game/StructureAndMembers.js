import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

const StructureAndMembers = props => {
  return (
    <Container>
      Roster
    </Container>
  )
}

StructureAndMembers.propTypes = {
}

StructureAndMembers.defaultProps = {
}

export default connect(
  {
  },
  StructureAndMembers
)

const Container = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
