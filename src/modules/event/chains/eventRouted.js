import { toggle, set, wait, when } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import moment from 'moment-timezone'

import authenticate from '../../../factories/authenticate'
import apiGet from '../../../factories/apiGet'
import changeView from '../../../factories/changeView'
import changeSidebarView from '../../../factories/changeSidebarView'

const getEvent = ({ state, path, http, props }) => {
  if (!state.get('authorization.authenticated')) return path.error()
  return http.get(`/events/${props.id}`)
    .then(path.success)
    .catch(path.error)
}

const setOccurenceInfo = ({ props, state }) => {
  const event = props.result
  const timezone = state.get('user.timezone')
  state.set('event.data', Object.assign({}, event, {
    start: moment.unix(props.s).tz(timezone).toDate(),
    end: moment.unix(props.e).tz(timezone).toDate(),
  }))
}

export default [
  authenticate([
    when(state`app.initialAnimation`), {
      true: [
        changeView('empty'),
        getEvent, {
          success: [
            setOccurenceInfo,
            changeSidebarView({ view: 'viewEvent', tab: 'general', title: props`result.title` }, [
              apiGet('/events', 'events.data'), { success: [], error: [] },
              toggle(state`app.sidebarImmune`),
              wait(250),
              changeView('events'),
              toggle(state`app.sidebarImmune`),
            ]),
          ],
          error: changeView('fourohfour'),
        },
      ],
      false: [
        changeSidebarView({ icon: 'hourglass' },
          [
            set(state`event.data`, null),
            wait(360),
            getEvent, {
              success: [
                setOccurenceInfo,
                changeSidebarView({ view: 'viewEvent', tab: 'general', title: props`result.title` }),
              ],
              error: [],
            },
          ],
        ),
      ],
    },
  ]),
]
