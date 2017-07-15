import { wait, when, set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default (view, continuesequence = []) => {
  return [
    when(state`app.sidebarImmune`), {
      true: [],
      false: set(state`app.sidebarActive`, false),
    },
    when(state`app.initialDrawerAnimation`), {
      true: wait(450),
      false: [],
    },
    set(state`app.previousView`, state`app.currentView`),
    set(state`app.currentView`, view),
    continuesequence,
  ]
}
