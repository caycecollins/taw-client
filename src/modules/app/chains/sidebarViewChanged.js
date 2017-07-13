export default [
  ({ props, state }) => {
    state.set(`app.sidebarPreviousView`, state.get('app.sidebarView'))
    state.set(`app.sidebarView`, props.view)
    state.set(`app.sidebarTitle`, props.title)
    state.set(`app.sidebarIcon`, props.icon)
    state.set(`app.sidebarActive`, true)
  },
]
