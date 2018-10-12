var slots = {
  methods: {
    slotNextFile() {
      if (this.index <= this.putFileData.length - 1) {
        this.index += 1;
        this.$send(this.SIGNAL_PUT_FILE(this));
      } else {
        this.index = 0;
        this.putFileData = [];
        this.putFileName = [];
      }
    },
    
  }
}

export default slots
