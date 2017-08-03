import { wait } from 'cerebral/operators'

import scheduleEvent from '../actions/scheduleEvent'
import scheduleEventReset from '../signals/scheduleEventReset'

export default [
  scheduleEvent,
  wait(400),
  scheduleEventReset,
]
