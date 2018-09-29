<template>
  <div ref="terminal" v-show="termVisible" class="term"></div>
</template>

<script>
import signals from "./signals.js";
import slots from "./slots.js";
import listener from "../../plugins/mixinEventsListener.js";
import onEvent from "../../plugins/mixinOnEvents.js";
import { Terminal } from "xterm";
import * as fit from "xterm/lib/addons/fit/fit";
import * as attach from "xterm/lib/addons/attach/attach";
import "xterm/dist/xterm.css";
Terminal.applyAddon(fit);
Terminal.applyAddon(attach);

export default {
  name: "cli",
  mixins: [signals, slots, listener, onEvent],
  props: [],
  data() {
    return {
      ws: null,
      term: null,
      lastCmd: null,
      recData: null,
      passwd: null,
      termVisible: true,
      termDirty: false,
      termOptions: {
        rows: 5,
        fontSize: 18,
        lineHeight: 1,
        padding: 10,
        allowTransparency: true,
        theme: {
          background: "#1e1e1e"
        }
      }
    };
  },
  mounted: function() {
    window.addEventListener("resize", this.resizeTerm);
    this.$nextTick(function() {
      this.initTerm();
    });
  },
  methods: {
    initTerm() {
      this.term = new Terminal(this.termOptions);
      let $terminal = this.$refs["terminal"];
      this.$nextTick(() => {
        this.term.open($terminal);
        this.resizeTerm();
      });
    },
    toggleTermVisible() {
      this.termVisible = !this.termVisible;
    },
    connect(url, passwd) {
      this.passwd = passwd;
      this.lastCmd = "connect";
      this.ws = new WebSocket(url);
      this.ws.binaryType = "arraybuffer";
      this.term.attach(this.ws, true, true);

      this.ws.onopen = function() {
        this.term.focus();
        this.term.write("\x1b[32;2mWelcome to 1ZLAB-MicroIDE!\x1b[m\r\n");
        this.ws.onmessage = function(event) {
          if (event.data instanceof ArrayBuffer) {
            var data = new Uint8Array(event.data);
            switch (this.binary_state) {
              case 11:
                // first response for put
                if (this.decode_resp(data) == 0) {
                  // send file data in chunks
                  for (
                    var offset = 0;
                    offset < put_file_data.length;
                    offset += 1024
                  ) {
                    this.ws.send(put_file_data.slice(offset, offset + 1024));
                  }
                  this.binary_state = 12;
                }
                break;
              case 12:
                // final response for put
                if (this.decode_resp(data) == 0) {
                  this.show_message(
                    "success! " +
                      put_file_name +
                      ", " +
                      put_file_data.length +
                      " bytes"
                  );
                  if (put_file_name === "microide.py") {
                    this.ws.send("from microide import *\r");
                  }
                  put_file_data = null;
                  this.send_file_name = "none selected.";
                  this.panel = "";
                } else {
                  this.show_message("Failed sending " + put_file_name);
                }
                this.binary_state = 0;
                break;
            }
          }
          try {
            this.recData = JSON.parse(event.data);
            console.log(this.recData);
          } catch (error) {}
        }.bind(this);
      }.bind(this);

      this.ws.onclose = function() {
        this.is_connected = false;
        this.$toast.error("Disconnected");
        if (this.term) {
          this.term.write("\r\n\x1b[31mDisconnected\x1b[m\r\n");
        }
        this.prepare_for_connect();
      }.bind(this);
    },

    send_cmd(cmd) {
      this.ws.write(cmd);
    },

    resizeTerm() {
      this.term.fit();
    },

    decode_resp(data) {
      if (data[0] == "W".charCodeAt(0) && data[1] == "B".charCodeAt(0)) {
        var code = data[2] | (data[3] << 8);
        return code;
      } else {
        return -1;
      }
    }
  },
  watch: {}
};
</script>

<style scoped>
.term {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
  /* border-top: 2px solid #61616161; */
}
</style>
