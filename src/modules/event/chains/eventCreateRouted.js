import { toggle, wait, when } from 'cerebral/operators'
import { state } from 'cerebral/tags'

import authenticate from '../../../factories/authenticate'
import apiGet from '../../../factories/apiGet'
import changeView from '../../../factories/changeView'
import changeSidebarView from '../../../factories/changeSidebarView'

export default [
  authenticate([
    when(state`app.initialAnimation`), {
      true: [
        changeView('empty'),
        apiGet('/units/divisions', 'units.divisions'), { success: [], error: [] },
        changeSidebarView({ view: 'createEvent', icon: 'calendar-plus-o', title: 'Create New Event' }, [
          apiGet('/events', 'events.data'), { success: [], error: [] },
          toggle(state`app.sidebarImmune`),
          wait(250),
          changeView('events'),
          toggle(state`app.sidebarImmune`),
        ]),
      ],
      false: [
        changeSidebarView({ icon: 'hourglass' },
          [
            wait(300),
            changeSidebarView({ view: 'createEvent', icon: 'calendar-plus-o', title: 'Create New Event' }),
          ],
        ),
      ],
    },
  ]),
]
