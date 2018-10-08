// import debounce from 'lodash/debounce';
var slots = {
  methods: {
    //打开设置窗口,点击设置按钮时触发

    slotResizeEditor() {
      // debounce(function () {
      this.$refs["editor"].layout();

      // }, 200);
    },

    slotShowCode(kwargs) {
      this.code = kwargs.code;
      this.openedFile = kwargs.filename;
      setTimeout(() => this.$send(this.SIGNAL_CLEAR_TERM(this)), 300);
      // this.$send(this.SIGNAL_CLEAR_TERM(this));
    },


  }
}

export default slots
