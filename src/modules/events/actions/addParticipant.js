import { findIndex } from 'lodash'

export default function addParticipant ({ props, state }) {
  const checkParticipants = findIndex(state.get(`${props.path}.participants`), participant => participant.model.id === props.participant.key)
  if (checkParticipants < 0) {
    const searchResultIndex = findIndex(state.get(`search.results`), result => result.id === props.participant.key)
    state.set(`search.results.${searchResultIndex}.exists`, true)
    state.push(`${props.path}.participants`, {
      display: props.participant.value,
      model: {
        [props.participant.type === 'user' ? 'callsign' : 'name']: props.participant.value,
        id: props.participant.key,
      },
    })
  }
}
