<template>
  <div>
    <mu-flex direction='column'>
      <mu-flex direction='row'>
        <mu-flex direction="column"
          style="background:#212121;width:15vw;height:97vh;padding:0">
          <!-- 文件结构 嵌套列表的方式 -->
          <mu-expansion-panel @change="update_tree()"
            style="width:15vw;background:#212121;">
            <div slot="header"
              style="color:#eeeeee;height:20px;">Root</div>
            <mu-divider style="background:#42424242"></mu-divider>
            <div class="outer-container">
              <div class="inner-container">
                <mu-list toggle-nested
                  class="list content"
                  :value="list_index"
                  @change="handleChange">

                  <mu-list-item v-for="(i,index) in root_files.children"
                    :key="index"
                    :value="i.index"
                    button
                    :ripple="false"
                    @click="get_code('',i.name,i.children)"
                    nested>

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
                    <!-- 二级目录 -->
                    <mu-list-item v-for="j in i.children"
                      :key="j.name"
                      button
                      :ripple="false"
                      @click="get_code(i.name,j.name,false)"
                      slot="nested"
                      :value="j.index">
                      <mu-icon value="description"
                        style="padding:6px"
                        color='green'></mu-icon>
                      <mu-list-item-title style="color:#fff">{{j.name}}</mu-list-item-title>
                    </mu-list-item>
                  </mu-list-item>

                </mu-list>
              </div>
            </div>

          </mu-expansion-panel>

          <!-- 创建文件 -->
          <mu-expansion-panel style="width:15vw;background:#212121;"
            :expand="panel === 'panel1'"
            @change="toggle('panel1')">
            <div slot="header"
              style="color:#eeeeee;height:20px;">New File</div>
            <mu-flex justify-content="end"
              align-items="center"
              direction="column"
              style="width:100%;padding:8px 24px">
              <mu-text-field style="width:100%"
                v-model="new_file_name"
                placeholder="file name"></mu-text-field>
              <mu-flex style="width:100%"
                align-items="center"
                justify-content="end">
                <mu-button small
                  @click="new_file()"
                  color="success">add</mu-button>
              </mu-flex>
            </mu-flex>
          </mu-expansion-panel>

          <!-- 创建文件夹 -->
          <mu-expansion-panel style="width:15vw;background:#212121;"
            :expand="panel === 'panel2'"
            color="grey"
            @change="toggle('panel2')">
            <div slot="header"
              style="color:#eeeeee;height:20px;">New Folder</div>
            <mu-flex justify-content="end"
              align-items="center"
              direction="column"
              style="width:100%;padding:8px 24px">
              <mu-text-field style="width:100%"
                v-model="new_folder_name"
                placeholder="folder name"></mu-text-field>
              <mu-flex style="width:100%"
                align-items="center"
                justify-content="end">
                <mu-button small
                  @click="new_folder()"
                  color="success">add</mu-button>
              </mu-flex>
            </mu-flex>
          </mu-expansion-panel>

          <!-- 发送文件 -->
          <mu-expansion-panel style="width:15vw;background:#212121;"
            :expand="panel === 'panel3'"
            color="grey"
            @change="toggle('panel3')">
            <div slot="header"
              style="color:#eeeeee;height:20px;">Send File</div>
            <mu-flex justify-content="end"
              align-items="center"
              direction="column"
              style="width:100%;padding:8px 24px">

              <p id="filename"
                style="color:#5c6bc0;font-size:14px;text-align:center">none selected. </p>

              <mu-flex style="width:100%;padding-top:6px"
                align-items="center"
                justify-content="end">
                <mu-button small
                  @click="file_input()"
                  color="indigo400"
                  style="margin:0 6px">
                  Browser...
                </mu-button>
                <mu-button :disabled="!is_connected"
                  color="blue"
                  small
                  @click="send_button_clicked()">SEND</mu-button>
              </mu-flex>
              <p id="file-status"
                style="margin:12px 0;font-size:14px;color:#5c6bc0"></p>
            </mu-flex>

            <input type="file"
              ref="file_dialog"
              style="display:none">
          </mu-expansion-panel>

        </mu-flex>
        <!-- 左侧栏 结束 -->

        <mu-flex direction="column"
          style="height:97vh;width:85vw;background:#1e1e1e">
          <!-- monaco编辑器 -->
          <m-monaco-editor style="height:97vh;width:85vw;"
            v-if="is_connected"
            v-model="code"
            :mode="mode"
            :theme="theme"
            :syncInput="true"
            :fontSize="20"></m-monaco-editor>
        </mu-flex>
      </mu-flex>

      <!-- 底栏 -->
      <mu-flex style="width:100vw;height:3vh;background:#414141;padding-right:16px;color:white"
        justify-content="end"
        align-items="center">

        <mu-flex style="width:15vw;padding-left:8px;"
          justify-content="start"
          align-items="center">

        </mu-flex>
        <mu-flex style="width:45vw;padding-left:8px;"
          justify-content="start"
          align-items="center">
          <mu-button v-if="opened_file"
            icon
            small
            color="grey"
            @click="update_code()">
            <mu-icon value="save"></mu-icon>
          </mu-button>
          <p v-if="opened_file"
            style="margin:0;font-size:16px;text-align:center;color:white">Current file: {{opened_file}}</p>
        </mu-flex>

        <mu-flex style="width:40vw"
          justify-content="end"
          align-items="center">
          <!-- <p id="file-status"
            style="padding:auto 0;margin:0 6px;font-size:16px"></p> -->
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

    </mu-flex>

    <!-- terminal container -->
    <div v-show="showTerm"
      style="width:85vw;height:auto;position:fixed;left:15vw;bottom:3vh;background:#1e1e1e">
      <mu-appbar :z-Depth="3"
        style="width: 100%;height:48px"
        color='#1e1e1e'
        title="Title">
        <mu-button slot="left"
          icon
          @click="closeFullscreenDialog">
          <mu-icon value="keyboard_arrow_down"
            color="grey"></mu-icon>
        </mu-button>
        <mu-flex style="height:46px"
          justify-content="end"
          align-items="center">

          <mu-text-field style="height:46px;margin:auto 6px"
            :disabled="is_connected"
            color="white"
            v-model="url"
            placeholder="ws://192.168.xxx.xxx:8266/"></mu-text-field>
          <mu-button style="margin-right:6px"
            color="secondary"
            small
            @click="connect_button_clicked()">{{button_text}}</mu-button>

        </mu-flex>
      </mu-appbar>
      <!-- terminal -->
      <mu-flex ref="term_container"
        direction="row"
        style="width:100%;background:#1e1e1e">
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
      panel: "",
      theme: "vs-dark",
      showTerm: false,
      binary_state: 0,
      opened_file: "",
      new_file_name: "",
      new_folder_name: "",
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
      var size = [155, 20];
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

    toggle(panel) {
      this.panel = panel === this.panel ? "" : panel;
    },

    calculate_size(win) {
      var cols = win.innerWidth / 7;
      var rows = win.innerHeight / 12;
      return [cols, rows];
    },

    handleChange(val) {
      this.list_index = val;
    },

    new_file() {
      this.last_command = "new_file('" + this.new_file_name + "')\r";
      this.ws.send(this.last_command);
    },

    new_folder() {
      this.last_command = "create_folder('" + this.new_folder_name + "')\r";
      this.ws.send(this.last_command);
    },

    get_code(dir = "", filename, is_dir) {
      if (!is_dir) {
        this.opened_file = dir + "/" + filename;
        this.last_command = "get_code('" + dir + "/" + filename + "')\r";
        this.ws.send(this.last_command);
      }
    },
    update_code() {
      var uint8array = new TextEncoder().encode(
        this.code.replace(/\r\n/g, "\n")
      );
      console.log("uint", uint8array);

      put_file_name = this.opened_file;
      put_file_data = uint8array;
      this.put_file();
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
                    "success! " +
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
        // console.log("sdfs", e.target.result);
        put_file_data = new Uint8Array(e.target.result);
        console.log("put file data", put_file_data);
        console.log(put_file_name + " - " + put_file_data.length + " bytes");
        document.getElementById("filename").innerHTML = put_file_name;
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
        // console.log("raw:", this.ws_return);
        if (
          this.ws_return.startsWith("tree") ||
          this.ws_return.startsWith("new_file") ||
          this.ws_return.startsWith("create_folder")
        ) {
          var root_files = this.ws_return
            .slice(0, this.ws_return.length - 5)
            .replace(this.last_command + "\n", "");
          // console.log("sliced:", root_files);
          if (this.ws_return.startsWith("new_file")) {
            root_files = this.ws_return
              .replace(this.last_command + "\n", "")
              .slice(2, this.ws_return.length - 5);
          }
          this.root_files = JSON.parse(root_files);

          // console.log("tree obj:", this.root_files);
          this.ws_return = "";
          this.last_command = "";
        }

        if (this.ws_return.startsWith("get_code")) {
          var code = this.ws_return
            .slice(0, this.ws_return.length - 5)
            .replace(this.last_command + "\n", "");
          // console.log(code);

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

<style>
.mu-expansion-toggle-btn.mu-button {
  margin-left: auto;
  margin-right: -12px;
  color: rgba(221, 207, 207, 0.67);
  -webkit-transform: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  transform: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.mu-text-field-input {
  color: rgba(221, 207, 207, 0.67) !important;
}

.terminal {
  float: left;
  border: #1e1e1e solid 8px;
  font-family: "DejaVu Sans Mono", "Liberation Mono", monospace;
  font-size: 16px;
  color: #f0f0f0;
  background: #1e1e1e !important;
}

.mu-expansion-panel-content {
  padding: 6px;
}

.list {
  background: #212121;
  width: 16vw;
  /* min-height: 20vh; */
  /* max-height: 60vh; */
  padding: 0;
}

.outer-container,
.content {
  /* min-height: 20vh; */
  height: 50vh;
}
.outer-container {
  position: relative;
  overflow: hidden;
}
.inner-container {
  position: absolute;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
