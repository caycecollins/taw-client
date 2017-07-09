export default [
  ({ props, state }) => {
    state.set(`app.drawerActive`, props.value)
  },
]
