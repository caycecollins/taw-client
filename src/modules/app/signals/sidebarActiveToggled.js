import { when, set, wait } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

export default [
  set(state`app.sidebarActive`, props`value`),
  when(props`value`), {
    true: [],
    false: [
      set(state`app.sidebarPreviousView`, state`app.sidebarView`),
      wait(450),
      set(state`app.sidebarTab`, null),
      set(state`app.sidebarView`, null),
      set(state`app.sidebarTitle`, null),
      set(state`app.sidebarReset`, 'app.sidebarReset'),
      set(state`app.sidebarSubmit`, 'app.sidebarSubmit'),
      ({ state, router }) => router.goTo(`/${state.get('app.currentView')}`),
    ],
  },
]
