import { set } from 'cerebral/operators'
import { state, string, props } from 'cerebral/tags'
import { httpGet } from '@cerebral/http/operators'

import changeView from '../../../factories/changeView'

export default [
  httpGet(string`/units/${props`id`}`), {
    success: [
      set(state`game.gameData`, props`response.result`),
      changeView('game'),
    ],
    error: changeView('fourohfour'),
  },
]
