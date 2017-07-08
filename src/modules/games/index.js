import changeView from '../../factories/changeView'

const getGames = async ({ http, state }) => {
  if (!state.get('games.gamesList')) {
    console.log('grabbing games')
    const gamesFromApi = await http.get('/games')
    state.set('games', { gamesList: gamesFromApi.result })
  } else {
    console.log('using cached games list')
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
