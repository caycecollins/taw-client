import drawerActiveToggled from './signals/drawerActiveToggled'
import drawerLargeToggled from './signals/drawerLargeToggled'
import drawerMinimalToggled from './signals/drawerMinimalToggled'
import sidebarActiveToggled from './signals/sidebarActiveToggled'
import sidebarViewChanged from './signals/sidebarViewChanged'

function getInitialDrawerPinned () {
  if (window.innerWidth < 840) {
    return false
  } else {
    return true
  }
}

export default {
  state: {
    currentView: null,
    previousView: null,
    drawerActive: getInitialDrawerPinned(),
    drawerLarge: getInitialDrawerPinned(),
    sidebarActive: null,
    sidebarView: null,
  },
  signals: {
    drawerActiveToggled,
    drawerLargeToggled,
    drawerMinimalToggled,
    sidebarActiveToggled,
    sidebarViewChanged,
  },
}
