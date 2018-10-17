var slots = {
  methods: {
    //打开设置窗口,点击设置按钮时触发
    slotTogglePane() {
      if (this.percent > 0) {
        this.percent = 0;
        this.$emit("resize");
        setTimeout(() => this.$emit("resize"), 100);
      } else {
        this.percent = 20;
        this.$emit("resize");
        setTimeout(() => this.$emit("resize"), 100);
      }
    },
    slotShowPane() {
      this.percent = 20;
      this.$emit("resize");
      setTimeout(() => this.$emit("resize"), 100);
    },

    // slotHidePane() {
    //   this.percent = 0;
    //   this.$emit("resize");
    //   setTimeout(() => this.$emit("resize"), 400);
    // }

  }
}

export default slots
