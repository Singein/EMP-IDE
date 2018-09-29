var signals = {
  methods: {
    //打开设置窗口,点击设置按钮时触发
    SIGNAL_APPLAY_SETTINGS(sender, receiver = 'parent', slot = 'slotApplySettings') {
      return {
        event: "applySettings",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          url: this.url,
          passwd: this.passwd,
          fontSize: this.fontSize
        }
      }
    },
    SIGNAL_TOGGLE_SETTINGS(sender, receiver = 'parent', slot = 'slotToggleSettings') {
      return {
        event: "toggleSettings",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

  }
}

export default signals
