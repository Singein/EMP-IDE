var slots = {
  methods: {
    //打开设置窗口,点击设置按钮时触发
    slotUpdateTree(kwargs) {
      this.data = kwargs.treeData;
      setTimeout(() => this.$send(this.SIGNAL_CLEAR(this)),300);
    }

  }
}

export default slots
