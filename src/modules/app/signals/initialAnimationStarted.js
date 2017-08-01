import { set, wait } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default [
  wait(600),
  set(state`app.initialAnimation`, false),
]
