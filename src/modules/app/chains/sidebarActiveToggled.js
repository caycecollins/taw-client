export default [
  ({ props, state, router }) => {
    state.set(`app.sidebarActive`, props.value)
    if (!props.value) {
      state.set('app.sidebarPreviousView', state.get('app.sidebarView'))
      setTimeout(() => {
        state.set('app.sidebarTab', null)
        state.set('app.sidebarView', null)
        state.set('app.sidebarSubmit', 'app.sidebarSubmit')
        return router.goTo(`/${state.get('app.currentView')}`)
      }, 450)
    }
  },
]
