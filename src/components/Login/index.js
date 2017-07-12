import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import { form } from '@cerebral/forms'

import ViewContainer from '../ViewContainer'
import Button from '../Button'
import Input from '../Input'
import ErrorMessage from '../Input/ErrorMessage'

const LoginForm = props => {
  let enabled = true
  if (props.settings.disableSubmitWhenFormIsInValid.value) {
    enabled = props.form.isValid
  }
  return (
    <ViewContainer>
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
            enabled && props.login()
          }}
          disabled={!enabled || props.authorizationPending}
          label={props.authorizationPending ? 'Loggin In...' : 'Login'}
          type="submit"
          icon={props.authorizationPending && 'crosshairs'}
          iconSpin={props.authorizationPending && true}
        />
        <br />
        <br />
        {(!props.authorizationPending && props.authorizationError && props.previousCallsign === props.form.callsign.value && !props.form.password.hasValue) &&
          <ErrorMessage>The username/password was invalid.</ErrorMessage>
        }
      </form>
    </ViewContainer>
  )
}

LoginForm.propTypes = {
  form: PropTypes.object,
  settings: PropTypes.object,
  onReset: PropTypes.func,
  login: PropTypes.func,
  previousCallsign: PropTypes.string,
  authorizationPending: PropTypes.bool,
  authorizationError: PropTypes.object,
}
export default connect(
  {
    form: form(state`login.form`),
    settings: state`app.settings`,
    onReset: signal`app.onReset`,
    login: signal`authorization.authenticate`,
    previousCallsign: state`authorization.callsign`,
    authorizationPending: state`authorization.pending`,
    authorizationError: state`authorization.error`,
  },
  LoginForm
)
