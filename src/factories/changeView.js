import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default (view) => {
  return [
    set(state`app.previousView`, state`app.currentView`),
    set(state`app.currentView`, view),
  ]
}
