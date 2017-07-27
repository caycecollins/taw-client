import { findIndex } from 'lodash'

export default [
  ({ props, state }) => {
    for (const p of state.get('events.createEvent.participants')) {
      if (p.model.id === props.participant.key) {
        return state.set('events.createEvent.participantDuplicate', true)
      }
    }

    const searchResultIndex = findIndex(state.get('search.results'), result => result.id === props.participant.key)
    searchResultIndex >= 0 && state.set(`search.results.${searchResultIndex}.exists`, true)

    state.set('events.createEvent.participantDuplicate', false)
    state.push('events.createEvent.participants', {
      display: props.participant.value,
      model: {
        [props.participant.type === 'user' ? 'callsign' : 'name']: props.participant.value,
        id: props.participant.key,
      },
    })
  },
]
