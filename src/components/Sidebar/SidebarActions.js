import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import { form } from '@cerebral/forms'
import styled, { css } from 'styled-components'
import { lighten, rgba } from 'polished'

const SidebarActions = props =>
  <SidebarActionsContainer active={props.sidebarSubmit && props.sidebarSubmit !== 'app.sidebarSubmit'}>
    <ResultFlash active={props.error}>
      {props.error ? `Error! Please report to DEVOPS:  ${props.error.status} | ${props.error.name} | ${props.error.body.error.message}` : ''}
    </ResultFlash>
    <ResetAction
      type="reset"
      onClick={() => props.sidebarResetClicked({ form: props.sidebarReset })}
      pending={props.pending}
    >
      {props.pending ? '' : 'reset'}
    </ResetAction>
    <CancelAction
      type="cancel"
      onClick={() => props.sidebarActiveToggled({ value: false })}
      pending={props.pending}
    >
      {props.pending ? '' : 'cancel'}
    </CancelAction>
    <SubmitAction
      disabled={!props.form.isValid}
      title={!props.form.isValid && 'Required inputs must be completed!'}
      type="submit"
      onClick={() => props.form.isValid && props.sidebarSubmitClicked({ form: props.sidebarSubmit })}
      pending={props.pending}
    >
      <Label>
        {props.pending ? 'In Progress...' : 'submit'}
      </Label>
    </SubmitAction>
  </SidebarActionsContainer>

SidebarActions.propTypes = {
  sidebarReset: PropTypes.string,
  sidebarSubmit: PropTypes.string,
  sidebarResetClicked: PropTypes.func,
  sidebarSubmitClicked: PropTypes.func,
  sidebarActiveToggled: PropTypes.func,
  form: PropTypes.object,
  pending: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
}

export default connect(
  {
    form: form(state`${state`app.sidebarSubmit`}`),
    pending: state`${state`app.sidebarSubmit`}.pending`,
    error: state`${state`app.sidebarSubmit`}.error`,
    sidebarReset: state`app.sidebarReset`,
    sidebarSubmit: state`app.sidebarSubmit`,
    sidebarResetClicked: signal`app.formResetClicked`,
    sidebarSubmitClicked: signal`${state`app.sidebarSubmit`}`,
    sidebarActiveToggled: signal`app.sidebarActiveToggled`,
  },
  SidebarActions
)

const SidebarActionsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${props => props.active ? '56px' : '0px'};
  bottom: ${props => props.active ? '0px' : '-56px'};
  transition: all .3s cubic-bezier(.4,0,.2,1);
  @media (max-width: 600px) {
    position: relative;
    left: initial;
    right: initial;
    bottom: initial;
  }
`

const sharedActionStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.2rem;
  text-transform: uppercase;
  padding: 4px 24px 0 24px;
  transition: all .2s cubic-bezier(.4,0,.2,1);
  &:hover {
    color: ${props => props.theme.colors.armyWhite};
    cursor: pointer;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 4px 16px;
  }
`

const sharedPendingStyles = css`
  ${props => props.pending && css`
    width: 0;
    flex: 0;
    padding: 0;
  `}
`

const ResetAction = styled.div`
  ${sharedActionStyles}
  flex: 0 1 auto;
  color: ${props => props.theme.colors.gray};
  background-color: ${props => rgba(props.theme.colors.darkGray3, 0.8)};
  &:hover {
    color: ${props => props.theme.colors.armyWhite};
    background-color: ${props => rgba(props.theme.colors.darkGray2, 1)};
    cursor: pointer;
  }
  ${sharedPendingStyles}
`

const CancelAction = styled.div`
  ${sharedActionStyles}
  flex: 1 0 auto;
  color: ${props => props.theme.colors.gray};
  background-color: ${props => rgba(props.theme.colors.darkGray2, 0.7)};
  &:hover {
    background-color: ${props => rgba(props.theme.colors.darkGray2, 1)};
  }
  ${sharedPendingStyles}
`

const SubmitAction = styled.div`
  ${sharedActionStyles}
  flex: 1 0 auto;
  color: ${props => props.theme.colors.darkGray2};
  background-color: ${props => props.disabled ? rgba(props.theme.colors.darkGray6, 0.6) : rgba(props.theme.colors.armyGreen, 0.8)};
  &:hover {
    background-color: ${props => !props.disabled && rgba(props.theme.colors.armyGreen, 1)};
    ${props => props.disabled && css`
      color: ${props => props.theme.colors.darkGray2};
      cursor: default;
    `}
  }
  ${props => props.pending && css`
    background-color: ${props => props.theme.colors.blue};
    color: ${props => props.theme.colors.armyWhite};
    &:hover {
      background-color: ${props => props.theme.colors.blue};
      cursor: default;
    }
  `}
`

const Label = styled.div`
  min-width: 200px;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 1rem;
    min-width: 100px;
  }
`

const ResultFlash = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
  height: ${props => props.active ? '32px' : '0px'};
  font-size: 0.8rem;
  text-align: right;
  bottom: 56px;
  padding: 8px 16px;
  color: ${props => lighten(0.15, props.theme.colors.lightRed)};
  background-color: ${props => props.active ? rgba(props.theme.colors.red, 0.4) : 'transparent'};
  transition: all .2s cubic-bezier(.4,0,.2,1);
`
