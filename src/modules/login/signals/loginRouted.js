import { when } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import { goTo } from '@cerebral/router/operators'

import changeView from '../../../factories/changeView'

export default [
  when(state`authorization.authenticated`), {
    true: goTo('/'),
    false: changeView('login'),
  },
]
