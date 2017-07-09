import changeView from '../../factories/changeView'

const getGames = async ({ http, state }) => {
  if (!state.get('games.gamesList')) {
    const gamesFromApi = await http.get('/games')
    state.set('games', { gamesList: gamesFromApi.result })
  }
}

export default {
  state: {
  },
  signals: {
    routed: [
      changeView('games'),
      getGames,
    ],
  },
}
