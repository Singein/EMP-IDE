import MuseUI from 'muse-ui'
import MMonacoEditor from 'vue-m-monaco-editor'
import 'muse-ui/dist/muse-ui.css'
import 'normalize.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'element-ui/lib/theme-chalk/index.css';
import Toast from 'muse-ui-toast'
import { MUSE_UI } from '@/config'
import VueCookie from 'vue-cookie'
import Tree from 'element-ui'


const installer = function (Vue) {
  MuseUI.theme.use(MUSE_UI.theme)
  Vue.use(MuseUI)
  Vue.use(MMonacoEditor)
  Vue.use(Toast)
  Vue.use(VueCookie)
  Vue.use(Tree)
  Vue.config.productionTip = false
}

export default installer
