import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'

import Button from '../../Button'

const CustomizeModules = props =>
  <Container>
    What is a Module?
    <Text>
      Modules are similar to &quot;Widgets&quot; in the wild.  Modules allow you to place the content that <span>YOU</span> want to see on your TAW dashboard!
    </Text>
    <br />
    <StyledButton
      onClick={() => console.log('not available yet')}
      icon="th-large"
      iconMarginless={true}
      label="CUSTOMIZE MODULES"
      outline={false}
      removeLeftPadding={true}
      size="md"
      disabled
    />
    <SmallText>Currently Unavailable</SmallText>
  </Container>

CustomizeModules.propTypes = {
  user: PropTypes.object,
}

export default connect(
  {
  },
  CustomizeModules
)

const Container = styled.div`
`

const Text = styled.div`
  margin-top: 4px;
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  line-height: 1.2rem;
  span {
    color: ${props => props.theme.colors.armyWhite};
  }
`
const SmallText = styled.div`
  font-size: 0.6rem;
  text-transform: uppercase;
  color: ${props => props.theme.colors.lightRed};
`

const StyledButton = styled(Button)`
  &:hover {
    background-color: transparent;
  }
`
