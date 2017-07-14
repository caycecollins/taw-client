export default [
  ({ props, state, router }) => {
    state.set(`app.sidebarActive`, props.value)
    if (!props.value) {
      router.goTo(`/${state.get('app.currentView')}`)
    }
  },
]
