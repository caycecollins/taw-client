export default [
  ({ props, state, storage }) => {
    state.set(`app.drawerActive`, props.value)
    storage.set(`app.drawerActive`, props.value)
  },
]
