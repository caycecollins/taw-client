import changeView from '../../factories/changeView'

const getGame = async ({ path, http, state, props }) => {
  const game = await http.get(`/units/${props.id}`) || null
  state.set('game', { selected: game.result || null })
  if (game.result) {
    return path.true()
  } else {
    if (state.get('app.currentView') !== 'fourohfour') return path.false()
  }
}

export default {
  state: {
  },
  signals: {
    routed: [
      changeView('game'),
      getGame, {
        true: changeView('game'),
        false: changeView('fourohfour'),
      },
    ],
  },
}
