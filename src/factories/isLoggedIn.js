export default function isLoggedInFactory () {
  function isLoggedIn ({ state, path }) {
    if (state.get('authorization.authenticated')) {
      return path.true()
    }
    return path.false()
  }
  return isLoggedIn
}
