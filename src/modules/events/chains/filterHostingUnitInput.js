import { debounce } from 'cerebral/operators'

import authenticate from '../../../factories/authenticate'
import apiGet from '../../../factories/apiGet'

export default [
  debounce(200), {
    continue: [
      authenticate([
        apiGet('/units/divisions', 'units.divisions'), {
          success: [
            ({ props, state }) => {
              let newDivisions = props.result.filter(division => {
                const needle = props.value.toLowerCase()
                const haystack = division.name.toLowerCase()
                return haystack.search(needle) > -1
              })
              state.set('units.divisions', newDivisions)
            },
          ],
          error: [
            ({ props }) => console.log(props),
          ],
        },
      ]),
    ],
    discard: [],
  },
]
