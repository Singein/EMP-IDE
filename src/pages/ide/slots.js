var slots = {
  methods: {

    slotToggleSettings() {
      this.showSettings = !this.showSettings;
    },

    slotSwitch(kwargs) {
      this.switcher = kwargs.index;
      // console.log(this.switcher);
    },

    slotLock() {
      this.tasklock = true;
    },
    
    slotUnlock() {
      this.tasklock = false;
    }
  }
}

export default slots
