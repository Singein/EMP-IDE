var slots = {
  methods: {

    slotToggleSettings() {
      this.showSettings = !this.showSettings;
    },
    // slotShowMessage(kwargs) {
    //   // document.getElementById("file-status").innerHTML = s;
    //   if (kwargs.message.startsWith("Failed")) this.$toast.error(kwargs.message);
    //   if (kwargs.message.startsWith("Sending")) this.$toast.info(kwargs.message);
    //   if (kwargs.message.startsWith("success")) this.$toast.success(kwargs.message);
    // },
   
    slotSwitch(kwargs){
      this.switcher = kwargs.index;
      console.log(this.switcher);
    }
  }
}

export default slots
