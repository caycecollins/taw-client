import { set, wait } from 'cerebral/operators'
import { state } from 'cerebral/tags'

import modalActiveToggled from '../../app/signals/modalActiveToggled'

export default [
  () => console.log('clicked'),
  set(state`app.modalActionPending`, true),
  wait(2000),
  modalActiveToggled,
  set(state`app.modalActionPending`, false),
]
