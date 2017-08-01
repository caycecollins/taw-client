import { findIndex } from 'lodash'

export default function removeParticipant ({ props, state }) {
  const participantIndex = findIndex(state.get('events.createEvent.participants'), participant => participant.model.id === props.model.id)
  const searchResultIndex = findIndex(state.get('search.results'), result => result.id === props.model.id)
  state.splice('events.createEvent.participants', participantIndex, 1)
  searchResultIndex >= 0 && state.set(`search.results.${searchResultIndex}.exists`, false)
}
