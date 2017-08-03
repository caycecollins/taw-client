export default function editEvent ({ path, state, http }) {
  const id = state.get('events.eventData.id')
  return http.delete(`/events/${id}`, { id })
    .then(response => {
      return path.success({ response })
    }).catch(rawError => {
      const error = JSON.stringify(rawError)
      return path.error({ error: JSON.parse(error) })
    })
}
