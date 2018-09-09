const routerMap = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'ide' }
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
