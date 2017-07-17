export default [
  ({ props, state, router }) => {
    state.set(`app.sidebarActive`, props.value)
    if (!props.value) {
      state.set('app.sidebarPreviousView', state.get('app.sidebarView'))
      setTimeout(() => {
        return router.goTo(`/${state.get('app.currentView')}`)
      }, 450)
    }
  },
]
