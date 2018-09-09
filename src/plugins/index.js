import MuseUI from 'muse-ui'
import MMonacoEditor from 'vue-m-monaco-editor'
import 'muse-ui/dist/muse-ui.css'
import 'normalize.css'
import 'material-design-icons/iconfont/material-icons.css'

import { MUSE_UI } from '@/config'

const installer = function (Vue) {
  MuseUI.theme.use(MUSE_UI.theme)
  Vue.use(MuseUI)
  Vue.use(MMonacoEditor)


  Vue.config.productionTip = false
}

export default installer
