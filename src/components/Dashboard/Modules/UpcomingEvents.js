import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'

const UpcomingEvents = props =>
  <Container>
    <Legend>
      <LegendItem>
        <Circle color="lightRed" />
        <Name color="lightRed">Mandatory</Name>
      </LegendItem>
      <LegendItem>
        <Circle color="lightBlue" />
        <Name color="lightBlue">Optional</Name>
      </LegendItem>
      <LegendItem>
        <Circle color="darkGray7" />
        <Name color="darkGray7">Other</Name>
      </LegendItem>
    </Legend>
  </Container>

UpcomingEvents.propTypes = {
  user: PropTypes.object,
}

export default connect(
  {
  },
  UpcomingEvents
)

const Container = styled.div`
`

const Legend = styled.div`
  display: flex;
  align-items: center;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
`

const Circle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => props.theme.colors[props.color] || props.theme.colors.gray};
`

const Name = styled.div`
  text-transform: uppercase;
  font-size: 0.8rem;
  color: ${props => props.theme.colors[props.color] || props.theme.colors.gray};
`
