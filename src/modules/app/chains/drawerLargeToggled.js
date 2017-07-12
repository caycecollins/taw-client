export default [
  ({ props, state, storage }) => {
    state.set(`app.drawerLarge`, props.value)
    storage.set(`app.drawerLarge`, props.value)
  },
]
