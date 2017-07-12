import Router from '@cerebral/router'

export default Router({
  preventAutostart: false,
  routes: {
    '/': 'dashboard.routed',
    '/login': 'login.routed',
    '/profile': 'profile.routed',
    '/notifications': 'notifications.routed',
    '/games': {
      '/': 'games.routed',
      '/:id': 'game.routed',
    },
    '/reports': 'reports.routed',
    '/*': 'fourohfour.routed',
  },
})
