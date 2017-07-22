import { debounce } from 'cerebral/operators'
import { props } from 'cerebral/tags'

import authenticate from '../../../factories/authenticate'
import apiGet from '../../../factories/apiGet'

export default [
  debounce(200), {
    continue: [
      authenticate([
        async ({ props, http, state }) => {
          const endpoint = '/search/units,users/' + props.value
          const getDataFromApi = await http.get(endpoint)
          const users = getDataFromApi.result.users
          const units = getDataFromApi.result.units
          state.set('search.results', users.concat(units))
        },
      ]),
    ],
    discard: [],
  },
]
