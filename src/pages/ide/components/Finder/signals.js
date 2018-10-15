var signals = {
  methods: {
    //   SIGNAL_SHOW_SELECTED(sender, receiver = 'cli', slot = 'slotSendCommands') {
    //     return {
    //       event: "showSelected",
    //       sender: sender,
    //       receiver: receiver,
    //       slot: slot,
    //       kwargs: {
    //           commands: ''
    //       }
    //     }
    //   },
    SIGNAL_DEPENDS_ON_MEMORY(sender, filename = null, receiver = 'cli', slot = "slotSendCommands") {
      return {
        event: "memory_analysing",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          filename: filename,
          command: 'memory_analysing(\'' + filename + '\')\r'
        }
      }
    },
  }
}

export default signals
