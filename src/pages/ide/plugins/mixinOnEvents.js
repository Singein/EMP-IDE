var onEvents = {
  watch: {
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
