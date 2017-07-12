import { set, when } from 'cerebral/operators'
import { goTo } from '@cerebral/router/operators'
import { state } from 'cerebral/tags'

export default (continueSequence = []) => {
  return [
    when(state`authorization.authenticated`), {
      true: continueSequence,
      false: [
        set(state`authorization.routeFailed`, true),
        goTo('/login'),
      ],
    },
  ]
}
