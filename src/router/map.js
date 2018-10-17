const routerMap = [
  {
    path: '/',
    name: 'ide',
    component: '/ide/index'
  },
  {
    path: '/ide',
    name: 'ide_old_pane',
    component: '/ide/index_old_pane'
  },
  {
    path: '*',
    component: '/error'
  }
]

export default routerMap
