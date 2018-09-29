var onEvents = {
  watch: {
    //打开设置窗口,点击设置按钮时触发
    listener: function () {
      if (this.signals.ref === this.$options.name) {
        try {
          this[this.signals.slot](this.signals.kwargs)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
export default onEvents
