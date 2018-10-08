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
          filename: filename,
          command: 'get_code(\'' + filename + '\')\r'
        }
      }
    },

    SIGNAL_GET_FILE(sender, filename = null, receiver = 'cli', slot = "slotGetFile") {
      return {
        event: "getCode",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          filename: filename,
        }
      }
    },

  }
}

export default signals
