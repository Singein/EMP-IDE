var slots = {
  methods: {
    slotToggleTermVisible() {
      this.termVisible = !this.termVisible;
    },
    slotResizeTerm() {
      // this.term.resize(20,1);
      this.term.fit();
    },
    slotClearTerm(){
      // setTimeout(1000,()=>this.term.clear());
      this.term.clear();
      this.term.clear();
    },

    slotConnectToDevice(kwargs) {
      this.passwd = kwargs.passwd;
      var url = kwargs.url;
      this.lastCmd = "connect";
      this.ws = new WebSocket(url);
      this.ws.binaryType = "arraybuffer";
      this.term.attach(this.ws, true, true);
     
      this.ws.onopen = this.onOpen;
      this.ws.onclose = this.onClose;
    },

    slotSendCommands(kwargs) {
      this.ws.send(kwargs.command);
    },

    slotPutFile() {
      var dest_fname = put_file_name;
      var dest_fsize = put_file_data.length;

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
      this.binary_state = 11;
      this.show_message("Sending " + put_file_name + "...");
      this.ws.send(rec);
    },
  }
}

export default slots
