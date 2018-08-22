<template>
  <div>
    <mu-flex direction='column'>
      <mu-flex direction='row'>
        <div>
          <!-- 文件结构 嵌套列表的方式 -->
          <mu-list style="background:#212121;width:15vw;height:97vh">
            <mu-list-item button :ripple="false" v-for="(i,index) in msg" :key="index">
              <mu-list-item-action>
                <mu-icon value="file" color='grey'></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title style="color:#fff">main.py</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </div>
        <mu-flex direction="column">
          <!-- monaco编辑器 -->
          <m-monaco-editor style="height:97vh;width:85vw"
            v-model="code" :mode="mode" :theme="theme" :fontSize="20"></m-monaco-editor>
        </mu-flex>
      </mu-flex>
      <!-- 底栏 -->
      <mu-flex style="width:100vw;height:3vh;background:#414141;padding-right:16px"  justify-content="end">

        <mu-button small icon color="white" @click="showTermDialog">
          <mu-icon value="keyboard_arrow_right" ></mu-icon>
        </mu-button>
        <mu-button small icon color="white">
          <mu-icon value="settings" ></mu-icon>
        </mu-button>
      </mu-flex>
    </mu-flex>

    <!-- terminal div -->
    <div ref="term_container" v-show="showTerm" style="width:85vw;height:300px;position:fixed;left:15vw;bottom:3vh;background:#000">
      <mu-appbar style="width: 100%;" color='#212121' title="Title">
        <mu-button slot="left" icon @click="closeFullscreenDialog">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <mu-flex style="height:46px" justify-content="center" align-items="center">
          <mu-text-field style="height:46px;background:#212121;margin:auto 6px"
            :disabled="is_connected" color="white" v-model="url" 
            placeholder="ws://192.168.2.189:8266/"></mu-text-field>

          <mu-button color="#414141" @click="button_clicked()">{{button_text}}</mu-button>
        </mu-flex>
      </mu-appbar>
      <mu-flex direction="row" style="width:100%;height:100%;background:#000">
        <div v-show="true" ref="term" style="width:85vw"></div>
      </mu-flex>
    </div>

  </div>
</template>

<script>
import Terminal from "../term.js";
import Deformation from "deformation";
export default {
  name: "App",
  components: {
    Deformation
  },
  data() {
    return {
      msg: ["main.py"],
      code: "import this",
      mode: "python",
      theme: "vs-dark",
      showTerm: false,
      ws: null,
      term: null,
      url: "ws://192.168.2.189:8266/",
      is_connected: false,
      button_text: "connect"
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      var size = this.calculate_size(this.$refs.term_container);
      // 初始化term对象,完成视图的渲染
      this.term = new Terminal({
        cols: size[0],
        rows: size[1],
        useStyle: true,
        screenKeys: true,
        cursorBlink: false
      });
      // this.term.open(document.getElementById("term"))
      this.term.open(this.$refs.term);

      // console.log(this.url)
    });
  },
  methods: {
    showTermDialog() {
      this.showTerm = true;
    },
    closeFullscreenDialog() {
      this.showTerm = false;
    },
    calculate_size(win) {
      var cols = win.innerWidth / 7;
      var rows = win.innerHeight / 12;
      return [cols, rows];
    },
    prepare_for_connect() {
      this.is_connected = false;
      this.button_text = "Connect";
    },
    button_clicked() {
      if (this.is_connected) {
        this.ws.close();
      } else {
        this.button_text = "Disconnect";
        this.connect();
      }
      this.is_connected = !this.is_connected;
    },
    connect() {
      var size = this.calculate_size(this.$refs.term_container);
      // window.addEventListener("resize", function() {
      //   var size = this.calculate_size(this.$refs.term_container);
      //   this.term.resize(size[0], size[1]);
      // });

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
            switch (binary_state) {
              case 11:
                // first response for put
                if (decode_resp(data) == 0) {
                  // send file data in chunks
                  for (
                    var offset = 0;
                    offset < put_file_data.length;
                    offset += 1024
                  ) {
                    this.ws.send(put_file_data.slice(offset, offset + 1024));
                  }
                  binary_state = 12;
                }
                break;
              case 12:
                // final response for put
                if (decode_resp(data) == 0) {
                  update_file_status(
                    "Sent " +
                      put_file_name +
                      ", " +
                      put_file_data.length +
                      " bytes"
                  );
                } else {
                  update_file_status("Failed sending " + put_file_name);
                }
                binary_state = 0;
                break;

              case 21:
                // first response for get
                if (decode_resp(data) == 0) {
                  binary_state = 22;
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
                    binary_state = 23;
                  } else {
                    // accumulate incoming data to get_file_data
                    var new_buf = new Uint8Array(get_file_data.length + sz);
                    new_buf.set(get_file_data);
                    new_buf.set(data.slice(2), get_file_data.length);
                    get_file_data = new_buf;
                    update_file_status(
                      "Getting " +
                        get_file_name +
                        ", " +
                        get_file_data.length +
                        " bytes"
                    );

                    var rec = new Uint8Array(1);
                    rec[0] = 0;
                    this.ws.send(rec);
                  }
                } else {
                  binary_state = 0;
                }
                break;
              }
              case 23:
                // final response
                if (decode_resp(data) == 0) {
                  update_file_status(
                    "Got " +
                      get_file_name +
                      ", " +
                      get_file_data.length +
                      " bytes"
                  );
                  saveAs(
                    new Blob([get_file_data], {
                      type: "application/octet-stream"
                    }),
                    get_file_name
                  );
                } else {
                  update_file_status("Failed getting " + get_file_name);
                }
                binary_state = 0;
                break;
              case 31:
                // first (and last) response for GET_VER
                console.log("GET_VER", data);
                binary_state = 0;
                break;
            }
          }
          this.term.write(event.data);
        }.bind(this);
      }.bind(this);

      this.ws.onclose = function() {
        this.is_connected = false;
        if (this.term) {
          this.term.write("\x1b[31mDisconnected\x1b[m\r\n");
        }
        this.prepare_for_connect();
      }.bind(this);
    }
  }
};
</script>
