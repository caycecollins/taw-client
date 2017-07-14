import { wait, set, when } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { setField, resetForm } from '@cerebral/forms/operators'

import drawerActiveToggled from './chains/drawerActiveToggled'
import drawerLargeToggled from './chains/drawerLargeToggled'
import sidebarActiveToggled from './chains/sidebarActiveToggled'

function determineDrawerActive () {
  const drawerActiveFromStorage = window.localStorage.getItem('app.drawerActive')
  if (!drawerActiveFromStorage) {
    const shouldBeActive = (window.innerWidth > 768)
    window.localStorage.setItem('app.drawerActive', shouldBeActive)
    return shouldBeActive
  }
  return JSON.parse(window.localStorage.getItem('app.drawerActive'))
}

function determineDrawerLarge () {
  const drawerLargeFromStorage = window.localStorage.getItem('app.drawerLarge')
  if (!drawerLargeFromStorage) {
    const shouldBeLarge = (window.innerWidth > 1024)
    window.localStorage.setItem('app.drawerLarge', shouldBeLarge)
    return shouldBeLarge
  }
  return JSON.parse(window.localStorage.getItem('app.drawerLarge'))
}

export default {
  state: {
    currentView: null,
    previousView: null,
    drawerActive: determineDrawerActive(),
    drawerLarge: determineDrawerLarge(),
    initialDrawerAnimation: true,
    sidebarActive: null,
    sidebarView: null,
    sidebarTitle: null,
    sidebarIcon: null,
    sidebarPreviousView: null,
    settings: {
      validateOnChange: {
        value: true,
        description: 'Show error messages on change',
        unToggleFieldsWhenChecked: [
          'app.settings.validateInputOnBlur',
          'app.settings.validateFormOnSubmit',
        ],
      },
      disableSubmitWhenFormIsInValid: {
        value: true,
        description: 'Disable submit when form is invalid',
        neverHidePanel: true,
      },
      validateInputOnBlur: {
        value: true,
        description: 'Show error message on blur',
        unToggleFieldsWhenChecked: [
          'app.settings.validateOnChange',
          'app.settings.validateFormOnSubmit',
        ],
      },
      validateFormOnSubmit: {
        value: true,
        description: 'Show error message on submit',
        unToggleFieldsWhenChecked: [
          'app.settings.validateOnChange',
          'app.settings.validateInputOnBlur',
        ],
      },
      showErrors: true,
    },
  },
  signals: {
    drawerActiveToggled,
    drawerLargeToggled,
    startInitialDrawerAnimation: [
      wait(2000),
      set(state`app.initialDrawerAnimation`, false),
    ],
    sidebarActiveToggled,
    fieldChanged: [
      when(state`${props`settingsField`}.value`), {
        true: [
          set(state`app.settings.showErrors`, true),
          setField(state`${props`field`}`, props`value`),
        ],
        false: [
          set(state`${props`field`}.value`, props`value`),
        ],
      },
    ],
    onReset: [resetForm(state`${props`formPath`}`)],
  },
}
