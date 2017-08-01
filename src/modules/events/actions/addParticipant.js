import { findIndex } from 'lodash'

export default function addParticipant ({ props, state }) {
  const searchResultIndex = findIndex(state.get('search.results'), result => result.id === props.participant.key)
  if (searchResultIndex >= 0) state.set(`search.results.${searchResultIndex}.exists`, true)

  state.push('events.createEvent.participants', {
    display: props.participant.value,
    model: {
      [props.participant.type === 'user' ? 'callsign' : 'name']: props.participant.value,
      id: props.participant.key,
    },
  })
}
