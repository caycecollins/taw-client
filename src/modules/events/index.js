import apiGet from '../../factories/apiGet'
import changeView from '../../factories/changeView'

export default {
  state: {
  },
  signals: {
    routed: [
      apiGet('/events', 'events'), {
        success: [
          (result) => { console.log(result) },
          changeView('events'),
        ],
        error: [
          (result) => { console.log(result.props.error) },
          changeView('fourohfour'),
        ],
      },
    ],
  },
}
