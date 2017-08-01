import { set, equals } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default function resetSidebarStateFactory () {
  return [
    equals(state`app.sidebarFormPath`), {
      'app.sidebarFormPath': [],
      otherwise: [
        set(state`${state`app.sidebarFormPath`}.error`, null),
      ],
    },
    set(state`app.sidebarPreviousView`, state`app.sidebarView`),
    set(state`app.sidebarActive`, false),
    set(state`app.sidebarTab`, null),
    set(state`app.sidebarView`, null),
    set(state`app.sidebarTitle`, null),
    set(state`app.sidebarFormPath`, 'app.sidebarFormPath'),
    set(state`app.sidebarSubmitSignal`, 'app.sidebarSubmit'),
  ]
}
