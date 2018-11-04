import Toast from 'muse-ui-toast'
import Message from 'muse-ui-message'
import VueCookie from 'vue-cookie'
import { MUSE_UI } from '@/config'
import { Tree, Upload } from 'element-ui'
import Connect from './connect'
import contentmenu from 'v-contextmenu'
import 'normalize.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'v-contextmenu/dist/index.css'

const MuseUI = require('muse-ui')

const installer = function (Vue) {
  MuseUI.theme.use(MUSE_UI.theme)
  Vue.use(MuseUI)
  Vue.use(Toast)
  Vue.use(Message)
  Vue.use(VueCookie)
  Vue.use(Tree)
  Vue.use(Upload)
  Vue.use(Connect)
  Vue.use(contentmenu)
}

export default installer
