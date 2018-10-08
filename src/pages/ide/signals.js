var signals = {
  methods: {
   
    SIGNAL_CLEAR(sender, receiver = 'cli', slot = 'slotClearTerm') {
      return {
        event: "clearTerm",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },
  }
}

export default signals
