import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import { form } from '@cerebral/forms'
import styled from 'styled-components'
import { rgba } from 'polished'

import ViewContainer from '../ViewContainer'
import Form from '../Form'
import SubmitButton from '../Form/SubmitButton'
import Button from '../Button'
import Input from '../Input'
import ErrorMessage from '../Input/ErrorMessage'

const formPath = 'login.authForm'

const LoginForm = props =>
  <ViewContainer centered={true}>
    <LoginContainer>
      <Form>
        <Input label="callsign" path={`${formPath}.callsign`} />
        <Input type="password" label="password" path={`${formPath}.password`} />
        <br />
        <Button
          onClick={e => props.onReset({ form: formPath })}
          label="Reset"
          type="button"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <SubmitButton
          formPath={formPath}
          submitSignal="authorization.authenticate"
          pendingState="authorization.pending"
          label="Login"
          pendingLabel="Logging In..."
        />
        <br />
        <br />
      </Form>
      <ErrorMessageContainer>
        {(!props.authorizationPending && props.authorizationError) &&
          <ErrorMessage>The username/password was invalid.</ErrorMessage>
        }
      </ErrorMessageContainer>
      <Helper>
        <span>Test Credentials:</span>
        <br />
        <br />
        Callsign: &nbsp; <span>inergy</span>
        <br />
        Password: &nbsp; <span>password</span>
      </Helper>
    </LoginContainer>
  </ViewContainer>

LoginForm.propTypes = {
  onReset: PropTypes.func,
  authorizationPending: PropTypes.bool,
  authorizationError: PropTypes.object,
}
export default connect(
  {
    form: form(state`${formPath}`),
    onReset: signal`app.onReset`,
    login: signal`authorization.authenticate`,
    previousCallsign: state`authorization.callsign`,
    authorizationPending: state`authorization.pending`,
    authorizationError: state`authorization.error`,
  },
  LoginForm
)

const LoginContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`

const ErrorMessageContainer = styled.div`
  height: 24px;
`

const Helper = styled.div`
  margin-top: 32px;
  padding: 24px;
  background-color: ${props => rgba(props.theme.colors.lightRed, 0.6)};
  border-radius: 4px;
  color: ${props => props.theme.colors.grayGreen};
  span {
    color: ${props => props.theme.colors.armyWhite};
  }
  font-size: 0.8rem;
  min-width: 240px;
`
