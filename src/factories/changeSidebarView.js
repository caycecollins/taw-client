import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default (args, continuesequence = []) => {
  return [
    set(state`app.sidebarPreviousView`, state`app.sidebarView`),
    set(state`app.sidebarView`, args.view),
    set(state`app.sidebarTitle`, args.title),
    set(state`app.sidebarIcon`, args.icon),
    set(state`app.sidebarActive`, true),
    continuesequence,
  ]
}
