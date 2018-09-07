// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import MMonacoEditor from 'vue-m-monaco-editor';
import Toast from 'muse-ui-toast';



MuseUI.theme.use('light');
Vue.use(Toast);
Vue.use(MuseUI);
Vue.use(MMonacoEditor)
Vue.config.productionTip = false
// theme.use('dark');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
