import drawerActiveToggled from './chains/drawerActiveToggled'
import drawerLargeToggled from './chains/drawerLargeToggled'
import sidebarActiveToggled from './chains/sidebarActiveToggled'
import sidebarViewChanged from './chains/sidebarViewChanged'

const drawerActiveFromStorage = window.localStorage.getItem('app.drawerActive')
const drawerLargeFromStorage = window.localStorage.getItem('app.drawerLarge')

export default {
  state: {
    currentView: null,
    previousView: null,
    drawerActive: drawerActiveFromStorage || (window.innerWidth > 768),
    drawerLarge: drawerLargeFromStorage || (window.innerWidth > 1024),
    sidebarActive: null,
    sidebarView: null,
  },
  signals: {
    drawerActiveToggled,
    drawerLargeToggled,
    sidebarActiveToggled,
    sidebarViewChanged,
  },
}
