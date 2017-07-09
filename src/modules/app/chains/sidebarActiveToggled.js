export default [
  ({ props, state }) => {
    state.set(`app.sidebarActive`, props.value)
  },
]
