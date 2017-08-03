const setParticipants = ({ props, state }) => {
  const users = state.get('events.eventData.users')
  const units = state.get('events.eventData.units')
  const participants = units.concat(users)
    .filter(participant => participant.EventUnits || participant.EventUsers)
    .map(participant => ({
      display: participant.EventUnits ? participant.name : participant.callsign,
      model: {
        [participant.EventUnits ? 'name' : 'callsign']: participant[participant.EventUnits ? 'name' : 'callsign'],
        id: participant.id,
      },
    }))
  return { participants }
}

export default setParticipants
