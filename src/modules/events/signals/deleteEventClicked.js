import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

import modalActiveToggled from '../../app/signals/modalActiveToggled'

export default [
  modalActiveToggled,
  set(state`app.modalView`, 'deleteEvent'),
  set(state`app.modalConfirmLabel`, 'Delete'),
]
