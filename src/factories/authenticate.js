import { set, when } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { goTo } from '@cerebral/router/operators'
import { httpGet } from '@cerebral/http/operators'
import { removeStorage } from '@cerebral/storage/operators'

export default function authenticateFactory (continueSequence = []) {
  return [
    when(state`authorization.authenticated`), {
      true: [
        when(state`user.callsign`), {
          true: [],
          false: [
            httpGet('/users/me'), {
              success: [
                set(state`user`, props`response.result`),
              ],
              error: [
                set(state`authorization.authenticated`, false),
                set(state`authorization.token`, null),
                removeStorage('authorization.token'),
                goTo('/login'),
              ],
            },
          ],
        },
        continueSequence,
      ],
      false: [
        goTo('/login'),
      ],
    },
  ]
}
