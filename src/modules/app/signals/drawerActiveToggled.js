import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { setStorage } from '@cerebral/storage/operators'

export default [
  set(state`app.drawerActive`, props`value`),
  setStorage('app.drawerActive', props`value`),
]
