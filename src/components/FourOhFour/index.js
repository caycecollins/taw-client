import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'

import ViewContainer from '../ViewContainer'
import Link from '../Link'
import Button from '../Button'

function FourOhFour (props) {
  return (
    <ViewContainer backgroundImage="/images/in-tank-bg.jpg">
      Whoops, we could not find the requested URL that you are on.
      <br />
      <br />
      <Link routeTo="dashboard">
        <Button icon="home" label="Dashboard" />
      </Link>
      <Link routeTo="games">
        <Button icon="game" label="Games" />
      </Link>
    </ViewContainer>
  )
}

FourOhFour.propTypes = {
}

export default connect(
  {
  },
  FourOhFour
)
