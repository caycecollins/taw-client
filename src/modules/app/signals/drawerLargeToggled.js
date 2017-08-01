import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { setStorage } from '@cerebral/storage/operators'

export default [
  set(state`app.drawerLarge`, props`value`),
  setStorage('app.drawerLarge', props`value`),
]
