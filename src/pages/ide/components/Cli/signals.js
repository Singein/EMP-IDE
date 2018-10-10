var signals = {
  methods: {
    SIGNAL_REPORT_CONNECTED(sender, receiver = 'setting', slot = 'slotConnected') {
      return {
        event: "reportConnected",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_REPORT_DISCONNECTED(sender, receiver = 'setting', slot = 'slotDisconnected') {
      return {
        event: "reportDisonnected",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

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

    SIGNAL_LOCK(sender, receiver = 'parent', slot = 'slotLock') {
      return {
        event: "lock",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
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

    SIGNAL_SHOW_CODES_PMAX(sender, data = null, receiver = 'editor', slot = "slotShowCode") {
      return {
        event: "showCode",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          code: data.code,
          // code: data,
          filename: this.getFilename
        }
      }
    },

    SIGNAL_DEPENDS_ON_MEMORY_TO_GET_FILE(sender, result = null, receiver = 'self', slot = "slotDependsOnMemoryToGetFile") {
      return {
        event: "dependsOnMemoryToGetFile",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          mf: result.mf,
          fsize: result.fsize,
          filename: result.filename
        }
      }
    },
  }
}

export default signals
