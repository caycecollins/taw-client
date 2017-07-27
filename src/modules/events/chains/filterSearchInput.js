import { debounce } from 'cerebral/operators'
import { findIndex, sortBy } from 'lodash'

import authenticate from '../../../factories/authenticate'

export default [
  debounce(200), {
    continue: [
      authenticate([
        async ({ props, http, state }) => {
          if (props.value && !props.value.match(/^\s*/)[0].length) {
            const endpoint = '/search/units,users/' + props.value
            const getDataFromApi = await http.get(endpoint)
            const rawUsers = getDataFromApi.result.users
            const users = rawUsers.map(user => ({ id: user.id, callsign: user.callsign, name: user.callsign }))
            const units = getDataFromApi.result.units
            const concatResults = users.concat(units)
            const sortedSearchResults = sortBy(concatResults, ['name'])
            const searchResults = sortedSearchResults.map(result => {
              const indexInParticipants = findIndex(state.get('events.createEvent.participants'), participant => participant.model.id === result.id)
              if (indexInParticipants > -1) result.exists = true
              return result
            })
            state.set('search.results', searchResults)
          } else {
            state.set('search.results', [])
          }
        },
      ]),
    ],
    discard: [],
  },
]
