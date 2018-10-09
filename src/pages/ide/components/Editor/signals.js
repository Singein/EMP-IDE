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
    SIGNAL_UNLOCK(sender, receiver = 'parent', slot = 'slotUnlock'){
      return {
        event: "unlock",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },
  }
}

export default signals
