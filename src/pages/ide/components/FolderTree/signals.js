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
    SIGNAL_GET_CODE(sender, filename = null, receiver = 'cli', slot = "slotSendCommands") {
      return {
        event: "getCode",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          // filename: filename,
          command: 'get_code(\'' + filename + '\')\r'
        }
      }
    },

  }
}

export default signals
