var handleConnection = {
  data() {
    return {
      binaryState: 0,
      putFilename: null,
      putFileData: null,
      getFilename: null,
      getFileData: null
    }
  },

  methods: {
    onOpen: function () {
      this.term.focus();
      this.term.write("\x1b[34;2mWelcome to 1ZLAB-EMPIDE!\x1b[m\r\n");

      this.ws.onmessage = this.onMessage;
      this.ws.send(this.passwd + '\r');
      this.ws.send("tree()\r");
      this.$toast.success("WebREPL connected!");

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
              this.$toast.success(
                "success! " +
                this.putFileName +
                ", " +
                this.putFileData.length +
                " bytes"
              );
              this.putFileData = null;
              this.putFileName = "";
            } else {
              this.$toast.error("Failed sending " + this.putFileName);
            }
            this.binaryState = 0;
            this.ws.send('\r\r');
            setTimeout(() => this.slotClearTerm(), 300);

            break;

          case 21:
            // first response for get
            if (this.decodeResp(data) == 0) {
              this.binaryState = 22;
              var rec = new Uint8Array(1);
              rec[0] = 0;
              this.ws.send(rec);
            }
            break;

          case 22:
            {
              // file data
              var sz = data[0] | (data[1] << 8);
              if (data.length == 2 + sz) {
                // we assume that the data comes in single chunks
                if (sz == 0) {
                  // end of file
                  this.binaryState = 23;
                } else {
                  // accumulate incoming data to this.getFileData
                  var new_buf = new Uint8Array(this.getFileData.length + sz);
                  new_buf.set(this.getFileData);
                  new_buf.set(data.slice(2), this.getFileData.length);
                  this.getFileData = new_buf;
                  this.$toast.info('Getting ' + this.getFilename + ', ' + this.getFileData.length + ' bytes');
                  var rec = new Uint8Array(1);
                  rec[0] = 0;
                  this.ws.send(rec);
                }
              } else {
                this.binaryState = 0;
              }
              break;
            }
          case 23:
            // final response
            if (this.decodeResp(data) == 0) {
              this.$toast.success('Got ' + this.getFilename + ', ' + this.getFileData.length + ' bytes');
              // saveAs(new Blob([this.getFileData], {
              //   type: "application/octet-stream"
              // }), this.getFilename);
              var code = new TextDecoder("utf-8").decode(this.getFileData);
              this.$send(this.SIGNAL_SHOW_CODES(this, code));

            } else {
              this.$toast.error('Failed getting ' + this.getFilename);
            }
            this.getFileData = null;
            this.getFilename = null;
            this.binaryState = 0;
            this.ws.send('\r\r');
            setTimeout(() => this.slotClearTerm(), 300);
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
