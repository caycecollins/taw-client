import { toggle, wait, when } from 'cerebral/operators'
import { state } from 'cerebral/tags'

import apiGet from '../../../factories/apiGet'
import changeView from '../../../factories/changeView'
import changeSidebarView from '../../../factories/changeSidebarView'

export default [
  when(state`app.initialAnimation`), {
    true: [
      changeView('empty'),
      apiGet('/units', 'units.divisions'), { success: [], error: [] },
      changeSidebarView({ view: 'scheduleEvent', icon: 'calendar-plus-o', title: 'Schedule Event' }, [
        apiGet('/events', 'events.eventsData'), { success: [], error: [] },
        toggle(state`app.sidebarImmune`),
        wait(250),
        changeView('events'),
        toggle(state`app.sidebarImmune`),
      ]),
    ],
    false: [
      changeSidebarView({ icon: 'hourglass' },
        [
          wait(250),
          apiGet('/units', 'units.divisions'), { success: [], error: [] },
          changeSidebarView({ view: 'scheduleEvent', icon: 'calendar-plus-o', title: 'Schedule Event' }),
        ],
      ),
    ],
  },
]
