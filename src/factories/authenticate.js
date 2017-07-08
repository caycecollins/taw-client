import { set, when } from 'cerebral/operators'
import { redirect } from '@cerebral/router/operators'
import { state } from 'cerebral/tags'

export default (continueSequence) => {
  return [
    when(state`user`), {
      true: continueSequence,
      false: redirect('/'),
    },
  ]
}
