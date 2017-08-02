import { debounce } from 'cerebral/operators'

import searchParticipants from '../actions/searchParticipants'

export default [
  debounce(100), {
    continue: [
      searchParticipants,
    ],
    discard: [],
  },
]
