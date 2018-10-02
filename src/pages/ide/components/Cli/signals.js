var signals = {
  methods: {
    SIGNAL_CONNECT_SUCCESS(sender, receiver = 'parent', slot = 'slotShowMessage') {
      return {
        event: "connectSuccess",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          message: "success! " + put_file_name + ", " + put_file_data.length + " bytes"
        }
      }
    },
    SIGNAL_CONNECT_FAILED(sender, receiver = 'parent', slot = 'slotShowMessage') {
      return {
        event: "connectFailed",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          message: "Failed sending " + put_file_name
        }
      }
    },
    SIGNAL_UPDATE_TREE(sender,data=null, receiver = 'folderTree', slot = 'slotUpdateTree') {
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

  }
}

export default signals
