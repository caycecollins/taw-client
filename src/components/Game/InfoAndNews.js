import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'

const InfoAndNews = props => {
  return (
    <Container>
      Info & News
    </Container>
  )
}

InfoAndNews.propTypes = {
}

InfoAndNews.defaultProps = {
}

export default connect(
  {
  },
  InfoAndNews
)

const Container = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`
