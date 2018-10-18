// import debounce from 'lodash/debounce';
var slots = {
  methods: {

    slotResizeEditor() {
      // debounce(function () {
      this.$refs["editor"].layout();

      // }, 200);
    },


    slotShowCode(kwargs) {
      this.code = kwargs.code;
      this.openedFile = kwargs.filename;
      this.$send(this.SIGNAL_UNLOCK(this));
      setTimeout(() => this.$send(this.SIGNAL_CLEAR_TERM(this)), 300);
      // this.$send(this.SIGNAL_CLEAR_TERM(this));
    },

    slotApplyFontSize(kwargs) {
      this.fontSize = parseInt(kwargs.fontSize);
    },

  }
}

export default slots
