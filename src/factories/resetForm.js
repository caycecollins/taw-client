import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { resetForm } from '@cerebral/forms/operators'

export default function resetFormFactory () {
  return [
    resetForm(state`${props`form`}`),
    set(state`${props`form`}.error`, null),
  ]
}
