var signals = {
  methods: {
    SIGNAL_RESIZE_START(sender, receiver = 'cli', slot = 'slotResizeTerm') {
      return {
        event: "onResizeStart",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },
    SIGNAL_RESIZING(sender, receiver = 'cli', slot = 'slotResizeTerm') {
      return {
        event: "onResizing",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },
    SIGNAL_RESIZE_EDITOR(sender, receiver = 'editor', slot = 'slotResizeEditor') {
      return {
        event: "onResizeStop",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    }

  }
}

export default signals
