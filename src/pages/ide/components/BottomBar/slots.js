var slots = {
  methods: {
    //打开设置窗口,点击设置按钮时触发
    slotConnected() {
      this.connected = true;
    },

    slotDisconnected() {
      this.connected = false;
    },

    slotShowMemoryStatus(kwargs){
      // console.log(kwargs);
      this.memoryStatus = kwargs.data;
    },

    slotShowSysInfo(kwargs){
      // console.log(kwargs);
      this.sysInfo = kwargs.data;
    }

  }
}

export default slots
