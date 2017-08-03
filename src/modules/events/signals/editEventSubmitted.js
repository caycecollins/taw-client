import apiGet from '../../../factories/apiGet'
import editEvent from '../actions/editEvent'

export default [
  editEvent,
  apiGet('/events', 'events.eventsData'), { success: [], error: [] },
]
