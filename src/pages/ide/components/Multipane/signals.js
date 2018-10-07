var signals = {
  methods: {
    SIGNAL_RESIZE_TERM(sender, receiver = 'cli', slot = 'slotResizeTerm') {
      return {
        event: "onResize",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },
    // SIGNAL_RESIZING(sender, receiver = 'cli', slot = 'slotResizeTerm') {
    //   return {
    //     event: "onResizing",
    //     sender: sender,
    //     receiver: receiver,
    //     slot: slot,
    //     kwargs: {}
    //   }
    // },
    SIGNAL_RESIZE_EDITOR(sender, receiver = 'editor', slot = 'slotResizeEditor') {
      return {
        event: "onResize",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    }

  }
}

export default signals
