import Router from '@cerebral/router'

export default Router({
  preventAutostart: false,
  routes: {
    '/login': 'login.routed',
    '/': 'dashboard.routed',
    '/profile': 'profile.routed',
    '/notifications': 'notifications.routed',
    '/events': {
      '/': 'events.routed',
      '/create': 'event.createRouted',
      '/report': 'event.reportRouted',
      '/:id': 'event.routed',
    },
    '/games': {
      '/': 'games.routed',
      '/:id': 'game.routed',
    },
    '/reports': 'reports.routed',
    '/*': 'fourohfour.routed',
  },
})
