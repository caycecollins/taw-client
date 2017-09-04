import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default function changeSidebarViewFactory (obj, continuesequence = []) {
  return [
    set(state`app.sidebarPreviousView`, state`app.sidebarView`),
    set(state`app.sidebarView`, obj.view || 'empty'),
    set(state`app.sidebarTitle`, obj.title || null),
    set(state`app.sidebarActive`, true),
    ({ state, props }) => {
      setTimeout(() => state.set('app.sidebarTab', obj.tab || null), 300)
    },
    continuesequence,
  ]
}
