import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'

import Button from '../../Button'
import Input from '../../Input'

const getUserUnits = divisions => {
  const units = divisions.map((unit, index) => {
    return (
      <option
        key={index}
        value={unit.id}
      >
        {unit.name}
      </option>
    )
  })
  units.unshift(<option key="empty" value="">Select Unit</option>)
  return units
}

const commonButtonProps = {
  iconMarginless: true,
  outline: false,
  removeLeftPadding: true,
  size: 'md',
  disabled: true,
}

const QuickUnitActions = props =>
  <Container>
    <Input
      type="select"
      path="dashboard.unit"
      nomargin
    >
      {props.divisions
        ? getUserUnits(props.divisions)
        : (
          <option key="loading" value="">
            Loading Units...
          </option>
        )
      }
    </Input>
    <br />
    <StyledButton
      icon="square"
      label={`Open/Edit Unit ${props.unit && '(unavailable)'}`}
      onClick={() => console.log('not available yet')}
      {...commonButtonProps}
      disabled={!props.unit}
    />
    <StyledButton
      icon="line-chart"
      label="View Unit Health Reports"
      onClick={() => console.log('not available yet')}
      {...commonButtonProps}
    />
    <StyledButton
      icon="globe"
      label="View Unit Public Page"
      onClick={() => console.log('not available yet')}
      {...commonButtonProps}
    />
    <StyledButton
      icon="comments"
      label="View Forums"
      onClick={() => console.log('not available yet')}
      {...commonButtonProps}
    />
    <StyledButton
      icon="envelope-o"
      label="Email Unit"
      onClick={() => console.log('not available yet')}
      {...commonButtonProps}
    />
    <StyledButton
      icon="id-card"
      label="Open Onboarding"
      onClick={() => console.log('not available yet')}
      {...commonButtonProps}
    />
  </Container>

QuickUnitActions.propTypes = {
  user: PropTypes.object,
  unit: PropTypes.string,
  divisions: PropTypes.array,
}

export default connect(
  {
    user: state`user`,
    unit: state`dashboard.unit.value`,
    divisions: state`units.divisions`,
  },
  QuickUnitActions
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledButton = styled(Button)`
  &:hover {
    background-color: transparent;
  }
`
