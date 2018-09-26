const routerMap = [
  {
    path: '/',
    name: 'home',
    // component: '/entry/Entry'
  },
  {
    path: '/ide',
    name: 'ide',
    component: '/ide/index'
  },
  {
    path: '*',
    component: '/error'
  }
]

export default routerMap
