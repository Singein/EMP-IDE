<template>
  <div>
    <mu-flex direction='column'>
      <mu-flex direction='row'>
        <div>
          <!-- 文件结构 嵌套列表的方式 -->

          <mu-list toggle-nested
            style="background:#212121;width:15vw;height:97vh;padding:0"
            :value="list_index"
            @change="handleChange">

            <mu-list-item button
              :ripple="false"
              @click="update_tree()"
              :value="-1"
              nested
              :open="false">

              <mu-icon value="folder"
                style="padding:6px"
                color='blue'></mu-icon>
              <mu-list-item-title style="color:#fff">root</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon class="toggle-icon"
                  size="24"
                  color='grey'
                  value="keyboard_arrow_down"></mu-icon>
              </mu-list-item-action>
              <!-- 开始遍历 this.root_files -->

              <mu-list-item v-for="(i,index) in root_files.children"
                :key="index"
                :value="i.index"
                button
                :ripple="false"
                @click="get_code(i.name)"
                nested
                slot="nested">

                <mu-icon v-if="i.children"
                  value="folder"
                  style="padding:6px"
                  color='blue'></mu-icon>
                <mu-icon v-if="!i.children"
                  value="description"
                  style="padding:6px"
                  color='green'></mu-icon>
                <mu-list-item-title style="color:#fff">{{i.name}}</mu-list-item-title>
                <mu-icon v-if="i.children"
                  class="toggle-icon"
                  size="24"
                  color='grey'
                  value="keyboard_arrow_down"></mu-icon>

                <mu-list-item v-for="j in i.children"
                  :key="j.name"
                  button
                  :ripple="false"
                  @click="get_code(i.name)"
                  slot="nested"
                  :value="j.index">
                  <mu-icon value="description"
                    style="padding:6px"
                    color='green'></mu-icon>
                  <mu-list-item-title style="color:#fff">{{j.name}}</mu-list-item-title>
                </mu-list-item>
              </mu-list-item>

            </mu-list-item>
          </mu-list>
        </div>
        <mu-flex direction="column">
          <!-- monaco编辑器 -->
          <m-monaco-editor style="height:97vh;width:85vw"
            v-model="code"
            :mode="mode"
            :theme="theme"
            :fontSize="20"></m-monaco-editor>
        </mu-flex>
      </mu-flex>

      <!-- 底栏 -->
      <mu-flex style="width:100vw;height:3vh;background:#414141;padding-right:16px;color:white"
        justify-content="end"
        align-items="center">
        <p id="file-status"
          style="padding:auto 0;margin:0 6px;font-size:16px"></p>
        <mu-button small
          icon
          color="white"
          @click="showTermDialog">
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-button>
        <mu-button small
          icon
          color="white">
          <mu-icon value="settings"></mu-icon>
        </mu-button>
      </mu-flex>
    </mu-flex>

    <!-- terminal container -->
    <div v-show="showTerm"
      style="width:85vw;height:auto;position:fixed;left:15vw;bottom:3vh;background:#000">
      <mu-appbar :z-Depth="3"
        style="width: 100%;height:48px"
        color='#414141'
        title="Title">
        <mu-button slot="left"
          icon
          @click="closeFullscreenDialog">
          <mu-icon value="keyboard_arrow_down"></mu-icon>
        </mu-button>
        <mu-flex style="height:46px"
          justify-content="end"
          align-items="center">

          <input type="file"
            ref="file_dialog"
            style="display:none">
          <mu-text-field @click="file_input()"
            placeholder="select a file"
            color='#414141'
            style="height:46px;margin:auto 6px"></mu-text-field><br/>
          <mu-button style="margin-right:6px"
            :disabled="!is_connected"
            color="blue"
            small
            @click="send_button_clicked()">SEND</mu-button>
          <mu-text-field style="height:46px;margin:auto 6px"
            :disabled="is_connected"
            color="white"
            v-model="url"
            placeholder="ws://192.168.2.189:8266/"></mu-text-field>
          <mu-button style="margin-right:6px"
            color="red"
            small
            @click="connect_button_clicked()">{{button_text}}</mu-button>

        </mu-flex>
      </mu-appbar>
      <!-- terminal -->
      <mu-flex ref="term_container"
        direction="row"
        style="width:100%;background:#000">
        <div v-show="true"
          ref="term"
          style="width:100%"></div>
      </mu-flex>
    </div>

  </div>
</template>

<script>
import Terminal from "../term.js";
var put_file_data = null;
var put_file_name = null;
export default {
  name: "App",
  components: {},
  data() {
    return {
      code: "",
      mode: "python",
      list_index: -1,
      theme: "vs-dark",
      showTerm: false,
      binary_state: 0,

      get_file_name: null,
      get_file_data: null,
      ws: null,
      term: null,
      last_command: "",
      ws_return: "",
      root_files: [],
      url: "ws://192.168.0.123:8266/",
      is_connected: false,
      button_text: "connect"
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      var size = [190, 20];
      // 初始化term对象,完成视图的渲染
      this.$refs.file_dialog.addEventListener(
        "change",
        this.handle_put_file_select,
        false
      );
      this.term = new Terminal({
        cols: size[0],
        rows: size[1],
        useStyle: true,
        screenKeys: true,
        cursorBlink: false
      });
      this.term.open(this.$refs.term);
    });
  },
  methods: {
    showTermDialog() {
      this.showTerm = !this.showTerm;
    },

    closeFullscreenDialog() {
      this.showTerm = false;
    },

    calculate_size(win) {
      var cols = win.innerWidth / 7;
      var rows = win.innerHeight / 12;
      return [cols, rows];
    },

    handleChange(val) {
      this.list_index = val;
    },

    get_code(filename) {
      this.last_command = "get_code('" + filename + "')\r";
      this.ws.send("get_code('" + filename + "')\r");
    },

    update_tree() {
      // this.ws.send("from tools import tree\r");
      this.last_command = "tree()\r";
      this.ws.send("tree()\r");
    },

    file_input() {
      this.$refs.file_dialog.click();
    },

    send_button_clicked() {
      this.put_file();
    },

    put_file() {
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
      this.update_file_status("Sending " + put_file_name + "...");
      this.ws.send(rec);
    },

    prepare_for_connect() {
      this.is_connected = false;
      this.button_text = "Connect";
    },

    connect_button_clicked() {
      if (this.is_connected) {
        this.ws.close();
      } else {
        this.button_text = "Disconnect";
        this.connect();
      }
      this.is_connected = !this.is_connected;
    },

    connect() {
      this.ws = new WebSocket(this.url);
      this.ws.binaryType = "arraybuffer";
      this.ws.onopen = function() {
        this.term.removeAllListeners("data");
        this.term.on(
          "data",
          function(data) {
            // Pasted data from clipboard will likely contain
            // LF as EOL chars.
            data = data.replace(/\n/g, "\r");
            this.ws.send(data);
            // this.last_command += data;
          }.bind(this)
        );

        this.term.on("title", function(title) {
          document.title = title;
        });

        this.term.focus();
        this.term.element.focus();
        this.term.write("\x1b[31mWelcome to MicroPython!\x1b[m\r\n");

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
                  this.update_file_status(
                    "Send success " +
                      put_file_name +
                      ", " +
                      put_file_data.length +
                      " bytes"
                  );
                  put_file_data = null;
                } else {
                  this.update_file_status("Failed sending " + put_file_name);
                }
                this.binary_state = 0;
                break;

              case 21:
                // first response for get
                if (this.decode_resp(data) == 0) {
                  this.binary_state = 22;
                  var rec = new Uint8Array(1);
                  rec[0] = 0;
                  this.ws.send(rec);
                }
                break;
              case 22: {
                // file data
                var sz = data[0] | (data[1] << 8);
                if (data.length == 2 + sz) {
                  // we assume that the data comes in single chunks
                  if (sz == 0) {
                    // end of file
                    this.binary_state = 23;
                  } else {
                    // accumulate incoming data to get_file_data
                    var new_buf = new Uint8Array(
                      this.get_file_data.length + sz
                    );
                    new_buf.set(this.get_file_data);
                    new_buf.set(data.slice(2), this.get_file_data.length);
                    this.get_file_data = new_buf;
                    this.update_file_status(
                      "Getting " +
                        this.get_file_name +
                        ", " +
                        this.get_file_data.length +
                        " bytes"
                    );

                    var rec = new Uint8Array(1);
                    rec[0] = 0;
                    this.ws.send(rec);
                  }
                } else {
                  this.binary_state = 0;
                }
                break;
              }
              case 23:
                // final response
                if (this.decode_resp(data) == 0) {
                  this.update_file_status(
                    "Got " +
                      this.get_file_name +
                      ", " +
                      this.get_file_data.length +
                      " bytes"
                  );
                  saveAs(
                    new Blob([this.get_file_data], {
                      type: "application/octet-stream"
                    }),
                    this.get_file_name
                  );
                } else {
                  this.update_file_status(
                    "Failed getting " + this.get_file_name
                  );
                }
                this.binary_state = 0;
                break;
              case 31:
                // first (and last) response for GET_VER
                console.log("GET_VER", data);
                this.binary_state = 0;
                break;
            }
          }
          this.term.write(event.data);

          if (this.last_command !== "") this.ws_return += event.data;
        }.bind(this);
      }.bind(this);

      this.ws.onclose = function() {
        this.is_connected = false;
        if (this.term) {
          this.term.write("\x1b[31mDisconnected\x1b[m\r\n");
        }
        this.prepare_for_connect();
      }.bind(this);
    },

    update_file_status(s) {
      document.getElementById("file-status").innerHTML = s;
    },

    handle_put_file_select(evt) {
      // The event holds a FileList object which is a list of File objects,
      // but we only support single file selection at the moment.
      var files = evt.target.files;

      // Get the file info and load its data.
      var f = files[0];
      put_file_name = f.name;
      var reader = new FileReader();
      reader.onload = function(e) {
        put_file_data = new Uint8Array(e.target.result);
        console.log(put_file_name + " - " + put_file_data.length + " bytes");
        // document.getElementById("put-file-button").disabled = false;
      };
      reader.readAsArrayBuffer(f);
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
  watch: {
    last_command: function() {},
    ws_return: function() {
      if (this.ws_return.endsWith(">>> ")) {
        console.log("raw:", this.ws_return);
        if (this.ws_return.startsWith("tree")) {
          var root_files = this.ws_return
            .slice(7, this.ws_return.length - 5)
            .replace(this.last_command, "");
          console.log("sliced:", root_files);
          this.root_files = JSON.parse(root_files);

          console.log("tree obj:", this.root_files);
          this.ws_return = "";
          this.last_command = "";
        }

        if (this.ws_return.startsWith("get_code")) {
          var code = this.ws_return;
          this.code = code;
          this.ws_return = "";
          this.last_command = "";
        } else {
          this.ws_return = "";
        }
      }
    }
  }
};
</script>
