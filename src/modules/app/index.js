import resetForm from '../../factories/resetForm'

import initialAnimationStarted from './signals/initialAnimationStarted'
import deviceSizeUpdated from './signals/deviceSizeUpdated'
import modalActiveToggled from './signals/modalActiveToggled'
import modalActionsUpdated from './signals/modalActionsUpdated'
import drawerActiveToggled from './signals/drawerActiveToggled'
import drawerLargeToggled from './signals/drawerLargeToggled'
import sidebarActiveToggled from './signals/sidebarActiveToggled'
import sidebarTabChanged from './signals/sidebarTabChanged'
import sidebarActionsUpdated from './signals/sidebarActionsUpdated'
import fieldChanged from './signals/fieldChanged'
import setFieldDefaultValue from './signals/setFieldDefaultValue'

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
    currentView: 'empty',
    previousView: null,
    drawerActive: determineDrawerActive(),
    drawerLarge: determineDrawerLarge(),
    initialAnimation: true,
    modalActive: false,
    modalView: null,
    modalConfirmLabel: null,
    modalActionPending: false,
    modalConfirmSignal: 'app.modalConfirm',
    sidebarActive: null,
    sidebarView: null,
    sidebarPreviousView: null,
    sidebarImmune: false,
    sidebarTitle: null,
    sidebarTab: null,
    sidebarFormPath: 'app.emptySidebarFormPath',
    emptySidebarFormPath: { showErrors: false },
    sidebarResetSignal: 'app.formResetClicked',
    sidebarSubmitSignal: 'app.sidebarSubmit',
  },
  signals: {
    initialAnimationStarted,
    deviceSizeUpdated,
    modalActiveToggled,
    modalActionsUpdated,
    drawerActiveToggled,
    drawerLargeToggled,
    sidebarActiveToggled,
    sidebarTabChanged,
    sidebarActionsUpdated,
    fieldChanged,
    formResetClicked: resetForm(),
    setFieldDefaultValue,
    sidebarSubmit: [], // used to clear submit signals from SidebarActions
    modalConfirm: [], // used to clear submit signals from Modals
  },
}
