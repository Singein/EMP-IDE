var signals = {
  methods: {
    RESIZE_START(sender, receiver = 'cli', slot = 'slotResizeTerm') {
      return {
        event: "onResizeStart",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },
    RESIZING(sender, receiver = 'cli', slot = 'slotResizeTerm') {
      return {
        event: "onResizing",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    }

  }
}

export default signals
