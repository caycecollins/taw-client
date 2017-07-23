import { wait, when, set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default (view, continuesequence = []) => {
  return [
    when(state`app.sidebarActive`), {
      true: [
        when(state`app.sidebarImmune`), {
          true: [],
          false: [
            set(state`app.sidebarActive`, false),
            set(state`app.sidebarSubmit`, 'app.sidebarSubmit'),
            set(state`app.sidebarPreviousView`, state`app.sidebarView`),
            set(state`app.sidebarView`, null),
            set(state`app.sidebarTab`, null),
            wait(300),
          ],
        },
      ],
      false: [],
    },
    when(state`app.initialAnimation`), {
      true: wait(450),
      false: [],
    },
    set(state`app.previousView`, state`app.currentView`),
    set(state`app.currentView`, view),
    continuesequence,
  ]
}
