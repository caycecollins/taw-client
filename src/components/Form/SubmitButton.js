import React from 'react'
import { form } from '@cerebral/forms'
import { connect } from '@cerebral/react'
import { signal, props, state } from 'cerebral/tags'

import Button from '../Button'

const handleSubmitForm = (props, e) => {
  e.preventDefault()
  props.form.isValid && props.submitForm({ form: props.formPath })
}

const SubmitButton = connect(
  {
    form: form(state`${props`formPath`}`),
    formPath: props`formPath`,
    submitForm: signal`${props`submitSignal`}`,
    pendingResponse: state`${props`pendingState`}`,
  },
  props =>
    <Button
      onClick={e => handleSubmitForm(props, e)}
      disabled={!props.form.isValid || props.pendingResponse}
      label={props.pendingResponse ? props.pendingLabel || 'Saving...' : props.label || 'Save'}
      type="submit"
      icon={props.pendingResponse && 'crosshairs'}
      iconSpin={props.pendingResponse && true}
    />
)

export default SubmitButton
