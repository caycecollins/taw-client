// import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { setField } from '@cerebral/forms/operators'

export default [
  setField(state`${props`field`}`, props`value`),
  // when(state`${props`settingsField`}.value`), {
  //   true: [
  //     set(state`app.settings.showErrors`, true),
  //   ],
  //   false: [
  //     set(state`${props`field`}.value`, props`value`),
  //   ],
  // },
]
