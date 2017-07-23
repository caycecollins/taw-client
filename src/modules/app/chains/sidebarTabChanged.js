export default [
  ({ props, state }) => {
    state.set(`app.sidebarTab`, props.tab)
    !props.tab && state.set('app.sidebarTab', null)
  },
]
