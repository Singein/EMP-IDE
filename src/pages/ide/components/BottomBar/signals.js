var signals = {
  methods: {
    //打开设置窗口,点击设置按钮时触发
    SIGNAL_OPENSET(sender , receiver = 'parent', slot = 'slotToggleSettings') {
      return {
        event: "openset",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          show: this.showSetting
        }
      }
    },

  }
}

export default signals
