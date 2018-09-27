const routerMap = [
  {
    path: '/',
    name: 'home',
    redirect: '/welcome'
  },
  {
    path: '/ide',
    name: 'ide',
    component: '/ide/index'
  },
  {
    path: '/welcome',
    component: '/welcome'
  },
  {
    path: '*',
    component: '/error'
  }
]

export default routerMap
