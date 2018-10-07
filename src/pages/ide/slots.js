var slots = {
  methods: {

    slotToggleSettings() {
      this.showSettings = !this.showSettings;
    },
    slotShowMessage(kwargs) {
      // document.getElementById("file-status").innerHTML = s;
      if (kwargs.message.startsWith("Failed")) this.$toast.error(kwargs.message);
      if (kwargs.message.startsWith("Sending")) this.$toast.info(kwargs.message);
      if (kwargs.message.startsWith("success")) this.$toast.success(kwargs.message);
    },
    slotShowCode(kwargs) {
      this.code = kwargs.code;
      this.openedFile = kwargs.filename;
      setTimeout(() => this.$send(this.SIGNAL_CLEAR(this)), 300);
    },
  }
}

export default slots
