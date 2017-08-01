import { parallel } from 'cerebral'
import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { setStorage } from '@cerebral/storage/operators'

export default parallel([
  setStorage('events.calendarView', props`view`),
  set(state`events.calendarView`, props`view`),
])
