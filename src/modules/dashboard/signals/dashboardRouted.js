import apiGet from '../../../factories/apiGet'
import changeView from '../../../factories/changeView'

export default [
  apiGet('/units', 'units.divisions'), { success: [], error: [] },
  apiGet('/events/invited', 'dashboard.upcomingEvents'), { success: [], error: [] },
  changeView('dashboard'),
]
