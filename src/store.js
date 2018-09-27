import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  tree: {
      data: [
        {
          name: "/",
          children: [
            { name: "boot.py", index: 0 },
            {
              name: "lib",
              children: [
                { name: "emp_boot.py", index: 1 },
                { name: "emp_dev.py", index: 2 },
                { name: "emp_utils.py", index: 3 },
                { name: "emp_wifi.py", index: 4 }
              ]
            }
          ]
        }
      ], //数据源
      node: null, //当前选中节点
  },
  mutations: {
    currentNodeChanged(tree, payload){
        tree.data = payload.data
        tree.node = payload.node
    }
  },
})


export default store
