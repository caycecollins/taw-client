import Router from '@cerebral/router'

export default Router({
  preventAutostart: false,
  routes: {
    '/': 'dashboard.routed',
    '/profile': 'profile.routed',
    '/games': {
      '/': 'games.routed',
      '/:id': 'game.routed',
    },
    '/reports': 'reports.routed',
    '/*': 'fourohfour.routed',
  },
})
