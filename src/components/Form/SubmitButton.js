import React from 'react'
import { form } from '@cerebral/forms'
import { connect } from 'cerebral/react'
import { signal, props, state } from 'cerebral/tags'

import Button from '../Button'

const handleSubmitForm = (props, e) => {
  e.preventDefault()
  props.form.isValid && props.submitForm({ form: props.formProp })
}

const SubmitButton = connect(
  {
    form: form(state`${props`form`}`),
    formProp: props`form`,
    submitForm: signal`${props`form`}Submitted`,
    pendingResponse: state`${props`form`}.pending`,
  },
  props =>
    <Button
      onClick={e => handleSubmitForm(props, e)}
      disabled={!props.form.isValid || props.pendingResponse}
      label={props.pendingResponse ? 'Saving...' : 'Save'}
      type="submit"
      icon={props.pendingResponse && 'crosshairs'}
      iconSpin={props.pendingResponse && true}
    />
)

export default SubmitButton
