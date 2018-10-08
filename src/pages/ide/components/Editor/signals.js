var signals = {
  methods: {
    SIGNAL_CLEAR_TERM(sender, receiver = 'cli', slot = 'slotClearTerm') {
      return {
        event: "clearTerm",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          who: 'editor'
        }
      }
    },
  }
}

export default signals
