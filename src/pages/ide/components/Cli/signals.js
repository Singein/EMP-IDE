var signals = {
  methods: {
    SIGNAL_UPDATE_TREE(sender, data = null, receiver = 'folderTree', slot = 'slotUpdateTree') {
      return {
        event: "updateTree",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          treeData: data
        }
      }
    },
    SIGNAL_SHOW_CODES(sender, data = null, receiver = 'editor', slot = "slotShowCode") {
      return {
        event: "showCode",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          // code: data.code,
          code: data,
          filename: this.getFilename
        }
      }
    },
   
  }
}

export default signals
