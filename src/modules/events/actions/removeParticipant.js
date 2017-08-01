import { findIndex } from 'lodash'

export default function removeParticipant ({ props, state }) {
  const participantIndex = findIndex(state.get(`${props.path}.participants`), participant => participant.model.id === props.participant.model.id)
  const searchResultIndex = findIndex(state.get('search.results'), result => result.id === props.participant.model.id)
  state.splice(`${props.path}.participants`, participantIndex, 1)
  searchResultIndex >= 0 && state.set(`search.results.${searchResultIndex}.exists`, false)
}
