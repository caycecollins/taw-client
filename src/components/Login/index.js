import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import { form } from '@cerebral/forms'
import styled from 'styled-components'
import { rgba } from 'polished'

import ViewContainer from '../ViewContainer'
import Button from '../Button'
import Input from '../Input'
import ErrorMessage from '../Input/ErrorMessage'

const LoginForm = props =>
  <ViewContainer centered={true}>
    <LoginContainer>
      <form onSubmit={(e) => e.preventDefault()}>
        {Object.keys(props.form.getFields()).map((field, index) => {
          return (
            <Input type={props.form[field].type} name={field} key={index} path={`login.form.${field}`} />
          )
        })}
        <br />
        <Button
          onClick={e => props.onReset({ formPath: 'login.form' })}
          label="Reset"
          type="button"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={e => {
            e.preventDefault()
            props.form.isValid && props.login()
          }}
          disabled={!props.form.isValid || props.authorizationPending}
          label={props.authorizationPending ? 'Loggin In...' : 'Login'}
          type="submit"
          icon={props.authorizationPending && 'crosshairs'}
          iconSpin={props.authorizationPending && true}
        />
        <br />
        <br />
      </form>
      {(!props.authorizationPending && props.authorizationError && props.previousCallsign === props.form.callsign.value && !props.form.password.hasValue) &&
        <ErrorMessage>The username/password was invalid.</ErrorMessage>
      }
      <Helper>
        Test Credentials:
        <br />
        <br />
        Callsign: &nbsp; <span>inergy</span>
        <br />
        Password: &nbsp; <span>password</span>
      </Helper>
    </LoginContainer>
  </ViewContainer>

LoginForm.propTypes = {
  form: PropTypes.object,
  onReset: PropTypes.func,
  login: PropTypes.func,
  previousCallsign: PropTypes.string,
  authorizationPending: PropTypes.bool,
  authorizationError: PropTypes.object,
}
export default connect(
  {
    form: form(state`login.form`),
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

const Helper = styled.div`
  margin-top: 32px;
  padding: 24px;
  background-color: ${props => rgba(props.theme.colors.lightRed, 0.3)};
  border-radius: 4px;
  color: ${props => props.theme.colors.grayGreen};
  span {
    color: ${props => props.theme.colors.armyWhite};
  }
  font-size: 0.8rem;
  min-width: 240px;
`
