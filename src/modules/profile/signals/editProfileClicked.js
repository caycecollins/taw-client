import { state } from 'cerebral/tags'

import changeSidebarView from '../../../factories/changeSidebarView'

export default [
  changeSidebarView({ view: 'viewProfile', tab: 'general', title: state`user.callsign` }),
]
