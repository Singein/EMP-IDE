var slots = {
  methods: {
    //打开设置窗口,点击设置按钮时触发
    slotConnected() {
      this.connected = true;
    },

    slotDisconnected() {
      this.connected = false;
    }

  }
}

export default slots
