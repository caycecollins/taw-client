export default ({ props, state }) => {
  state.set(`app.sidebarView`, props.view)
  state.set(`app.sidebarActive`, true)
}
