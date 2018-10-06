var handleConnection = {
  data() {
    return {
      binaryState: 0,
      putFileName: null,
      putFileData: null,
    }
  },

  methods: {
    onOpen: function () {
      this.term.focus();
      this.term.write("\x1b[34;2mWelcome to 1ZLAB-EMPIDE!\x1b[m\r\n");

      this.ws.onmessage = this.onMessage
      this.ws.send(this.passwd + '\r')
      this.ws.send("tree()\r")

    },

    onMessage: function (event) {
      if (event.data instanceof ArrayBuffer) {
        var data = new Uint8Array(event.data);
        switch (this.binaryState) {
          case 11:
            // first response for put
            if (this.decodeResp(data) == 0) {
              // send file data in chunks
              for (
                var offset = 0; offset < this.putFileData.length; offset += 1024
              ) {
                this.ws.send(this.putFileData.slice(offset, offset + 1024));
              }
              this.binaryState = 12;
            }
            break;
          case 12:
            // final response for put
            if (this.decodeResp(data) == 0) {
              this.show_message(
                "success! " +
                this.putFileName +
                ", " +
                this.putFileData.length +
                " bytes"
              );
              this.putFileData = null;
              this.send_file_name = "none selected.";
              this.panel = "";
            } else {
              this.show_message("Failed sending " + this.putFileName);
            }
            this.binaryState = 0;
            break;
        }
      }

      try {
        this.recData = JSON.parse(event.data);
        if (this.recData.func === 'tree')
          this.$send(this.SIGNAL_UPDATE_TREE(this, [this.recData.data]));
        if (this.recData.func === 'get_code')
          this.$send(this.SIGNAL_SHOW_CODES(this, this.recData.data));

      } catch (e) {

      }
    },

    onClose: function () {
      this.is_connected = false;
      this.$toast.error("Disconnected");
      if (this.term) {
        this.term.write("\r\n\x1b[31mDisconnected\x1b[m\r\n");
      }
      this.prepare();
    },

    putFile: function () {
      var dest_fname = this.putFileName;
      var dest_fsize = this.putFileData.length;

      // WEBREPL_FILE = "<2sBBQLH64s"
      var rec = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);
      rec[0] = "W".charCodeAt(0);
      rec[1] = "A".charCodeAt(0);
      rec[2] = 1; // put
      rec[3] = 0;
      rec[4] = 0;
      rec[5] = 0;
      rec[6] = 0;
      rec[7] = 0;
      rec[8] = 0;
      rec[9] = 0;
      rec[10] = 0;
      rec[11] = 0;
      rec[12] = dest_fsize & 0xff;
      rec[13] = (dest_fsize >> 8) & 0xff;
      rec[14] = (dest_fsize >> 16) & 0xff;
      rec[15] = (dest_fsize >> 24) & 0xff;
      rec[16] = dest_fname.length & 0xff;
      rec[17] = (dest_fname.length >> 8) & 0xff;
      for (var i = 0; i < 64; ++i) {
        if (i < dest_fname.length) {
          rec[18 + i] = dest_fname.charCodeAt(i);
        } else {
          rec[18 + i] = 0;
        }
      }

      // initiate put
      this.binaryState = 11;
      this.show_message("Sending " + this.putFileName + "...");
      this.ws.send(rec);
    },

    decodeResp(data) {
      if (data[0] == "W".charCodeAt(0) && data[1] == "B".charCodeAt(0)) {
        var code = data[2] | (data[3] << 8);
        return code;
      } else {
        return -1;
      }
    },

    prepare() {

    }
  },

}

export default handleConnection
