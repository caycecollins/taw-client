import { wait, when, set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

import resetSidebarState from './resetSidebarState'

export default function changeViewFactory (view, continuesequence = []) {
  return [
    when(state`app.sidebarActive`), {
      true: [
        when(state`app.sidebarImmune`), {
          true: [],
          false: [
            resetSidebarState(),
            wait(300),
          ],
        },
      ],
      false: [],
    },
    when(state`app.initialAnimation`), {
      true: wait(800),
      false: [],
    },
    set(state`app.previousView`, state`app.currentView`),
    set(state`app.currentView`, view),
    continuesequence,
  ]
}
