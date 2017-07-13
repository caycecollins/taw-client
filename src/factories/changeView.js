import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default (view, continuesequence = []) => {
  return [
    set(state`app.previousView`, state`app.currentView`),
    set(state`app.currentView`, view),
    continuesequence,
  ]
}
