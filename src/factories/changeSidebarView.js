import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default (obj, continuesequence = []) => {
  return [
    set(state`app.sidebarPreviousView`, state`app.sidebarView`),
    set(state`app.sidebarView`, obj.view || 'empty'),
    set(state`app.sidebarTitle`, obj.title || null),
    set(state`app.sidebarActive`, true),
    ({ state, props }) => {
      const time = state.get('app.initialDrawerAnimation') ? 300 : 300
      setTimeout(() => state.set('app.sidebarTab', obj.tab || null), time)
    },
    continuesequence,
  ]
}
