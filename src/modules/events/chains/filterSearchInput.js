import { debounce } from 'cerebral/operators'
import { sortBy } from 'lodash'

import authenticate from '../../../factories/authenticate'

export default [
  debounce(200), {
    continue: [
      authenticate([
        async ({ props, http, state }) => {
          const endpoint = '/search/units,users/' + props.value
          const getDataFromApi = await http.get(endpoint)
          const rawUsers = getDataFromApi.result.users
          const users = rawUsers.map(user => ({ id: user.id, callsign: user.callsign, name: user.callsign }))
          const units = getDataFromApi.result.units
          const concatResults = users.concat(units)
          const searchResults = sortBy(concatResults, ['name'])
          state.set('search.results', searchResults)
        },
      ]),
    ],
    discard: [],
  },
]
