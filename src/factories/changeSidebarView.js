import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default (args, continuesequence = []) => {
  return [
    set(state`app.sidebarPreviousView`, state`app.sidebarView`),
    set(state`app.sidebarView`, args.view || 'empty'),
    set(state`app.sidebarTitle`, args.title || 'Loading...'),
    set(state`app.sidebarIcon`, args.icon || 'blank'),
    set(state`app.sidebarActive`, true),
    continuesequence,
  ]
}
