<template>
  <div>
    <mu-linear-progress v-if="loading" color="secondary"></mu-linear-progress>
    <multipane class="vertical-panes" layout="vertical">
      <!-- 最左侧导航栏 -->
      <div class="pane left-pane" :style="{ maxWidth: '72px',minWidth:'72px', padding:'0' }">
        <mu-flex justify-content="start" align-items="center" direction="column" style="height:100%">

          <mu-flex justify-content="start" align-items="center" direction="column" style="height:50%">
            <mu-button class="icon-button" icon color="grey">
              <mu-icon size="36" value="code"></mu-icon>
            </mu-button>
            <mu-button class="icon-button" icon color="grey">
              <mu-icon size="36" value="search"></mu-icon>
            </mu-button>
            <mu-button class="icon-button" icon color="grey">
              <mu-icon size="36" value="extension"></mu-icon>
            </mu-button>
            <mu-button class="icon-button" icon color="grey" @click="deploy">
              <mu-icon size="36" value="cloud_download"></mu-icon>
            </mu-button>
            <mu-button class="icon-button" icon color="grey">
              <mu-icon size="36" value="book"></mu-icon>
            </mu-button>
          </mu-flex>

          <mu-flex justify-content="end" align-items="center" direction="column" style="height:50%">
            <mu-button class="icon-button" icon color="green" @click="excute_script">
              <mu-icon size="36" value="play_arrow"></mu-icon>
            </mu-button>
            <mu-button class="icon-button" icon color="yellow" @click="connect_button_clicked">
              <mu-icon size="36" value="power"></mu-icon>
            </mu-button>
          </mu-flex>

        </mu-flex>
      </div>
      <!-- 最左侧导航栏 结束 -->

      <!-- 目录结构 -->
      <div class="pane" :style="{ minWidth: '280px', maxWidth: '280px',padding:'0' }">
        <div>
          <mu-flex direction="column" class="ide-side-bar">
            <!-- 文件结构 嵌套列表的方式 -->
            <mu-expansion-panel @change="update_tree()" class="ide-panel">
              <div slot="header" class="ide-panel-header">
                <mu-button flat small color="grey">
                  <mu-icon left value="folder"></mu-icon>
                  Root DIR
                </mu-button>
              </div>
              <mu-divider class="ide-panel-divider"></mu-divider>
              <!-- file List -->
              <div class="outer-container">
                <div class="inner-container">

                  <mu-list toggle-nested class="ide-list content" :value="list_index" @change="handleChange">

                    <mu-list-item v-for="(i,index) in root_files.children" :key="index" :value="i.index" button :ripple="false" @click="get_code('',i.name,i.children)" nested>

                      <mu-icon v-if="i.children" value="folder" style="padding:6px" color='blue'></mu-icon>
                      <mu-icon v-if="!i.children" value="description" style="padding:6px" color='orange200'></mu-icon>

                      <mu-list-item-title style="color:#fff">{{i.name}}</mu-list-item-title>

                      <mu-button v-show="i.index===list_index&&!i.children" icon small @click="del_file">
                        <mu-icon value="delete" color="red300"></mu-icon>
                      </mu-button>

                      <!-- <mu-button v-show="i.index===list_index&&!i.children" icon small @click="get_file">
                            <mu-icon value="get_app" color="blue"></mu-icon>
                          </mu-button> -->

                      <mu-button v-show="i.index===list_index&&!i.children" icon small @click="excute_script">
                        <mu-icon value="play_arrow" color="success"></mu-icon>
                      </mu-button>

                      <!-- <mu-tooltip placement="left-start"> -->
                      <mu-icon v-if="i.children" class="toggle-icon" size="24" color='grey' value="keyboard_arrow_down"></mu-icon>
                      <!-- <mu-button icon small @click="del_folder(i.name)"
                            slot='content'>
                            <mu-icon value="delete" color="red300"></mu-icon>
                          </mu-button> -->
                      <!-- </mu-tooltip> -->
                      <!-- 二级目录 -->
                      <mu-list-item v-for="j in i.children" :key="j.name" button :ripple="false" @click="get_code(i.name,j.name,false)" slot="nested" :value="j.index">
                        <mu-icon value="description" style="padding:6px" color='orange200'></mu-icon>

                        <mu-list-item-title style="color:#fff">{{j.name}}</mu-list-item-title>

                        <mu-button v-show="j.index===list_index" icon small @click="del_file">
                          <mu-icon value="delete" color="red300"></mu-icon>
                        </mu-button>

                        <!-- <mu-button v-show="j.index===list_index" icon small @click="get_file">
                            <mu-icon value="get_app" color="blue"></mu-icon>
                          </mu-button> -->

                        <mu-button v-show="j.index===list_index" icon small @click="excute_script">
                          <mu-icon value="play_arrow" color="success"></mu-icon>
                        </mu-button>

                      </mu-list-item>
                    </mu-list-item>
                  </mu-list>

                </div>
              </div>

            </mu-expansion-panel>

            <!-- 创建文件 -->
            <mu-expansion-panel class="ide-panel" :expand="panel === 'panel1'" @change="toggle('panel1')">
              <div slot="header" class="ide-panel-header">
                <mu-button flat small color="grey">
                  <mu-icon left value="note_add"></mu-icon>
                  New File
                </mu-button>
              </div>
              <mu-flex justify-content="end" align-items="center" direction="column" class="ide-panel-flex">
                <mu-text-field style="width:100%" v-model="new_file_name" placeholder="file name"></mu-text-field>
                <mu-flex style="width:100%" align-items="center" justify-content="end">
                  <mu-button small :disabled="!is_connected" @click="new_file()" color="success">add</mu-button>
                </mu-flex>
              </mu-flex>
            </mu-expansion-panel>

            <!-- 创建文件夹 -->
            <mu-expansion-panel class="ide-panel" :expand="panel === 'panel2'" color="grey" @change="toggle('panel2')">
              <div slot="header" class="ide-panel-header">
                <mu-button flat small color="grey">
                  <mu-icon left value="create_new_folder"></mu-icon>
                  New Folder
                </mu-button>
              </div>
              <mu-flex justify-content="end" align-items="center" direction="column" class="ide-panel-flex">
                <mu-text-field style="width:100%" v-model="new_folder_name" placeholder="folder name"></mu-text-field>
                <mu-flex style="width:100%" align-items="center" justify-content="end">
                  <mu-button small :disabled="!is_connected" @click="new_folder()" color="success">add</mu-button>
                </mu-flex>
              </mu-flex>
            </mu-expansion-panel>

            <!-- 发送文件 -->
            <mu-expansion-panel class="ide-panel" :expand="panel === 'panel3'" color="grey" @change="toggle('panel3')">
              <div slot="header" class="ide-panel-header">
                <mu-button flat small color="grey">
                  <mu-icon left value="send"></mu-icon>
                  Send File
                </mu-button>
              </div>
              <mu-flex justify-content="end" align-items="center" direction="column" class="ide-panel-flex">

                <p id="filename" style="color:#5c6bc0;font-size:14px;text-align:center">{{send_file_name}}
                </p>

                <mu-flex style="width:100%;padding-top:6px" align-items="center" justify-content="end">
                  <mu-button small :disabled="!is_connected" @click="file_input()" color="indigo400" style="margin:0 6px">
                    Browser...
                  </mu-button>
                  <mu-button :disabled="!is_connected" color="blue" small @click="send_button_clicked()">SEND</mu-button>
                </mu-flex>
                <!-- <p id="file-status"
                  style="margin:12px 0;font-size:14px;color:#5c6bc0"></p> -->
              </mu-flex>

              <input type="file" ref="file_dialog" style="display:none" @change="handle_put_file_select">
            </mu-expansion-panel>

          </mu-flex>
        </div>
      </div>
      <!--目录结构 结束 -->

      <multipane-resizer></multipane-resizer>

      <!-- 编辑器 terminal区域  -->
      <div class="pane" :style="{ minWidth:'calc(100%-372px)',width:'100%',maxWidth:'100%',padding:'0'}">
        <multipane class="horizontal-panes" layout="horizontal">
          <!-- 标签页 -->
          <div class="pane ide-file-tabs">
            <mu-appbar v-if="opened_file!==''" class="ide-top-bar-appbar" :z-depth="0" color="#252526">
              {{opened_file.split('/')[1]}}
              <mu-button v-if='opened_file!==""' icon small slot="left" @click="update_code()">
                <mu-icon color="grey" value="save"></mu-icon>
              </mu-button>
            </mu-appbar>
          </div>
          <!-- 标签页 结束 -->

          <!-- <multipane-resizer></multipane-resizer> -->
          <!-- 编辑器 -->
          <div class="pane ide-file-body">
            <m-monaco-editor class="ide-editor" v-if='opened_file!==""' v-model="code" :mode="mode" :theme="theme" :syncInput="true" :fontSize="parseInt(fontSize)"></m-monaco-editor>
          </div>
          <!-- 编辑器 结束 -->

          <!-- <multipane-resizer /> -->
          <!-- terminal -->

          <!-- <div v-show="termVisible" ref="terminal" class="pane terminal-container"></div> -->
          <cli></cli>
        </multipane>
      </div>
      <!-- 编辑器 terminal区域 结束  -->
    </multipane>

    <!-- 底栏 -->
    <mu-flex class="ide-bottom-bar" justify-content="end" align-items="center">
      <!-- 左侧logo help -->
      <mu-flex class="ide-bottom-bar-left" justify-content="start" align-items="center">
        <p class="ide-bottom-bar-author">MicroIDE@1ZLAB</p>
        <a href="http://dev.1zlab.com/help" class="ide-bottom-bar-help" target="_blank">Help</a>
      </mu-flex>
      <!-- 中部 terminal 连接 -->
      <mu-flex class="ide-bottom-bar-center" justify-content="start" align-items="center">
        <!-- Terminal Icon -->
        <mu-button small flat color="grey" @click="toggleTermVisible">
          <mu-icon value="keyboard_arrow_right"></mu-icon>
          Terminal
        </mu-button>

        <mu-button flat color="grey" small @click="connect_button_clicked">
          <mu-icon value="power"></mu-icon>
          {{button_text}}
        </mu-button>

      </mu-flex>
      <!-- 右侧设置按钮  -->
      <mu-flex class="ide-bottom-bar-right" justify-content="end" align-items="center">
        <!-- Message area  -->
        <p id="file-status" class="ide-bottom-bar-message"></p>
        <!-- Settings Icon -->
        <mu-button small icon @click="openSettings()" color="grey">
          <mu-icon value="settings"></mu-icon>
        </mu-button>
      </mu-flex>
    </mu-flex>
    <!-- 底栏结束 -->

    <!-- 设置窗口 -->
    <mu-dialog title="MicroIDE Settings" width="400" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openSetting">

      <mu-flex direction='column'>
        <mu-text-field label="Url" :disabled="is_connected" color="primary" v-model="url" full-width placeholder="ws://192.168.xxx.xxx:8266/"></mu-text-field>

        <mu-text-field label="Password" :disabled="is_connected" color="primary" v-model="passwd" full-width placeholder="password" type="password"></mu-text-field>

        <mu-text-field label="Editor fontsize" color="primary" v-model="fontSize" full-width placeholder="editor fontsize"></mu-text-field>

      </mu-flex>

      <mu-button slot="actions" flat color="primary" @click="closeSettings()">Close</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import { Multipane, MultipaneResizer } from "vue-multipane";
import { Terminal } from "xterm";
import * as fit from "xterm/lib/addons/fit/fit";
import * as attach from "xterm/lib/addons/attach/attach";
import "xterm/dist/xterm.css";
// import { microide_codes } from "./microide.py.js";
// import Cli from "../components/Cli";

Terminal.applyAddon(fit);
Terminal.applyAddon(attach);

var put_file_data = null;
var put_file_name = null;

export default {
  name: "mirco-ide",
  components: {
    Multipane,
    MultipaneResizer,
    Cli
  },
  data() {
    return {
      code: "",
      fontSize: 16,
      mode: "python",
      theme: "vs-dark",
      // 当前文件
      opened_file: "",
      //目录列表
      root_files: [],
      // list列表,目前没用
      list_index: -1,
      // 左侧列表panel
      panel: "",
      // 进度条
      loading: false,
      // 设置窗口
      openSetting: false,
      // websocket对象
      ws: null,
      url: "",
      passwd: "",
      // ws是否连接
      is_connected: false,
      // terminal对像
      term: null,
      termVisible: false,
      termDirty: false,
      termOptions: {
        rows: 20,
        fontSize: 18,
        lineHeight: 1,
        padding: 10,
        allowTransparency: true,
        theme: {
          background: "#1e1e1e",
          
        }
      },

      // 字节流标志
      binary_state: 0,

      new_file_name: "",
      new_folder_name: "",

      // 上一条命令记录
      last_command: "",
      // websocket 返回数据接受对象
      ws_return: "",

      button_text: "connect",
      send_file_name: "none selected."
    };
  },

  mounted() {
    window.addEventListener("resize", this.resizeTerm);
    this.url = this.$cookie.get("url");
    this.passwd = this.$cookie.get("passwd");
    this.fontSize = this.$cookie.get("fontsize");
    this.initTerm();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.resizeTerm);
    if (this.is_connected) {
      this.term.detach(this.ws);
      this.ws.close();
    }
    this.term.destroy();
  },

  methods: {
    initTerm() {
      this.term = new Terminal(this.termOptions);
    },

    toggleTermVisible() {
      this.termVisible = !this.termVisible;
      if (this.termVisible && !this.termDirty) {
        this.termDirty = true;
        let $terminal = this.$refs["terminal"];
        this.$nextTick(() => {
          this.term.open($terminal);
          this.resizeTerm();
        });
      }
    },

    resizeTerm() {
      this.term.fit();
    },

    openSettings() {
      this.openSetting = true;
    },

    closeSettings() {
      this.openSetting = false;
      this.$cookie.set("fontsize", this.fontSize, {
        expires: "1Y"
      });
    },

    toggle(panel) {
      this.panel = panel === this.panel ? "" : panel;
    },

    handleChange(val) {
      // 目录树的index值
      this.list_index = val;
    },

    new_file() {
      if (this.is_connected) {
        if (this.new_file_name.length > 0) {
          this.last_command = "new_file('" + this.new_file_name + "')\r";
          this.ws.send(this.last_command);
          this.panel = "";
        } else {
          this.$toast.error("file name is empty!");
        }
      } else {
        this.$toast.error("connection error!");
      }
    },

    del_file() {
      this.last_command = "del_file('" + this.opened_file + "')\r";
      this.ws.send(this.last_command);
    },

    new_folder() {
      if (this.is_connected) {
        if (this.new_folder_name.length > 0) {
          this.last_command = "create_folder('" + this.new_folder_name + "')\r";
          this.ws.send(this.last_command);
          this.panel = "";
        } else {
          this.$toast.error("folder name is empty!");
        }
      } else {
        this.$toast.error("connection error!");
      }
    },

    del_folder(folder) {
      this.last_command = "del_folder('" + folder + "')\r";
      this.ws.send(this.last_command);
    },

    excute_script() {
      if (this.is_connected) {
        if (this.opened_file.length > 0) {
          this.last_command = "excute_script";
          this.ws.send(
            "exec(open('" + this.opened_file + "').read(), globals())\r"
          );
          this.showTerm = true;
        } else {
          this.$toast.error("please select a file first!");
        }
      } else {
        this.$toast.error("connection error!");
      }
    },

    get_code(dir = "", filename, is_dir) {
      if (!is_dir) {
        if (
          this.last_command === "excute_script" ||
          this.last_command.startsWith("del") ||
          this.last_command === "download_file"
        ) {
          // do nothing
        } else {
          this.loading = true;
          this.opened_file = dir + "/" + filename;
          this.last_command = "get_code('" + dir + "/" + filename + "')\r";
          this.ws.send(this.last_command);
        }
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
      if (this.is_connected) {
        this.last_command = "tree()\r";
        this.ws.send(this.last_command);
      }
    },

    deploy() {
      if (this.is_connected) {
        var uint8array = new TextEncoder().encode(
          microide_codes.replace(/\r\n/g, "\n")
        );
        put_file_name = "microide.py";
        put_file_data = uint8array;
        this.put_file();
      }
    },

    file_input() {
      this.$refs.file_dialog.click();
    },

    send_button_clicked() {
      if (this.is_connected) {
        this.put_file();
      } else {
        this.$toast.error("connection error!");
      }
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
      this.$cookie.set("url", this.url, {
        expires: "1Y"
      });
      this.$cookie.set("passwd", this.passwd, {
        expires: "1Y"
      });
      this.last_command = "connect";
      this.ws = new WebSocket(this.url);
      this.ws.binaryType = "arraybuffer";

      this.term.attach(this.ws, true, true);
      this.ws.onopen = function() {
        // this.term.off("data");
        // this.term.on(
        //   "data",
        //   function(data) {
        //     // Pasted data from clipboard will likely contain
        //     // LF as EOL chars.
        //     data = data.replace(/\n/g, "\r");
        //     this.ws.send(data);
        //     // this.last_command += data;
        //   }.bind(this)
        // );

        // this.term.on("title", function(title) {
        //   document.title = title;
        // });

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
          // this.term.write(event.data);

          if (this.last_command !== "") this.ws_return += event.data;
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

    show_message(s) {
      document.getElementById("file-status").innerHTML = s;
      if (s.startsWith("Failed")) this.$toast.error(s);
      if (s.startsWith("Sending")) this.$toast.info(s);
      if (s.startsWith("success")) this.$toast.success(s);
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
        // console.log("put file data", put_file_data);
        // console.log(put_file_name + " - " + put_file_data.length + " bytes");
        document.getElementById("filename").innerHTML = put_file_name;
      };
      reader.readAsArrayBuffer(f);
    },

    get_file() {
      this.last_command = "download_file";
      var blob = new Blob([this.code], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, this.opened_file.replace("/", "_"));
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
      this.show_message("Sending " + put_file_name + "...");
      this.ws.send(rec);
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

    // 通过对websocket的数据监听来完成数据的获取
    ws_return: function() {
      // 自动连接
      if (
        this.ws_return.startsWith("Password: ") &&
        this.last_command === "connect"
      ) {
        // console.log("raw ", this.ws_return);
        this.ws.send(this.passwd + "\r");
        this.ws_return = "";
        this.last_command = "wait_for_connect";
      }

      // 判断连接状态,若成功
      if (
        this.ws_return.indexOf("WebREPL connected") &&
        this.last_command === "wait_for_connect"
      ) {
        this.$toast.success("WebREPL connected");
        this.last_command = "";
        this.ws_return = "";
      }

      if (this.ws_return.endsWith(">>> ")) {
        // console.log("raw:", this.ws_return);

        // ws_return的类别过滤,以下几种操作会导致目录树树的变化
        if (
          this.ws_return.startsWith("tree") ||
          this.ws_return.startsWith("new_file") ||
          this.ws_return.startsWith("create_folder") ||
          this.ws_return.startsWith("del_folder") ||
          this.ws_return.startsWith("del_file")
        ) {
          var root_files = this.ws_return
            .slice(0, this.ws_return.length - 5)
            .replace(this.last_command + "\n", "");

          if (this.ws_return.startsWith("new_file")) {
            root_files = this.ws_return
              .replace(this.last_command + "\n", "")
              .slice(2, -5);
            // console.log("newfile return:", root_files);
          }

          // try catch 用于捕获非正常流程导致的错误输出,例如没有import microide的情况下,tree()函数的输出报错
          try {
            // console.log("root files changed by ", this.last_command);
            // console.log('root_files',root_files)
            this.root_files = JSON.parse(root_files);
          } catch (e) {
            // console.log(e);
            // this.ws_return = "";
            // this.last_command = "";
          }

          // console.log("tree obj:", this.root_files);
          this.ws_return = "";
          this.last_command = "";
        }

        // 获取相应文件的代码
        if (this.ws_return.startsWith("get_code")) {
          var code = this.ws_return
            .slice(0, this.ws_return.length - 5)
            .replace(this.last_command + "\n", "");
          // console.log(code);

          this.code = code;
          this.loading = false;
          this.ws_return = "";
          this.last_command = "";
        } else {
          this.ws_return = "";
          this.last_command = "";
        }
      }
    }
  }
};
</script>

<style scoped>
/* layout */
.left-pane {
  background: #333333 !important;
}

.icon-button {
  margin: 8px;
}

.vertical-panes {
  width: 100%;
  height: 97vh;
}

.vertical-panes > .pane {
  text-align: left;
  /* padding: 15px; */
  overflow: hidden;
  background: #1e1e1e;
}

.vertical-panes > .pane ~ .pane {
  border-top: 1px solid #61616161;
}

.horizontal-panes {
  width: 100%;
  height: 100%;
}

.horizontal-panes > .pane {
  text-align: left;
  /* padding: 15px; */
  overflow: hidden;
  background: #1e1e1e;
}

body {
  overflow-x: hidden;
  overflow-y: hidden;
}

/* 侧栏区域 */
.ide-side-bar {
  background: #252526;
  width: 100%;
  min-width: 280px;
  height: 97vh;
  padding: 0;
}

.ide-panel {
  width: 100%;
  min-width: 280px;
  background: #252526 !important;
}

.ide-panel-header {
  color: #eeeeee;
  height: 20px;
}

.ide-panel-divider {
  background: #42424242;
}

.ide-panel-flex {
  width: 100%;
  padding: 8px 24px;
}

.ide-list {
  background: #252526;
  width: 100% !important;
  min-width: 280px !important;
  padding: 0;
}

/* 顶栏区域 */
.ide-top-bar {
  height: 97vh;
  width: 82vw;
  background: #1e1e1e;
}

.ide-top-bar-appbar {
  width: 100%;
  height: 48px !important;
}

.ide-editor {
  height: 97vh;
  width: 82vw;
}

/* 底栏区域 */
.ide-bottom-bar {
  width: 100vw;
  height: 3vh;
  background: #414141;
  padding-right: 16px;
  color: white;
}

.ide-bottom-bar-left {
  width: 18vw;
  padding-left: 8px;
}

.ide-bottom-bar-center {
  width: 42vw;
  padding-left: 8px;
}

.ide-bottom-bar-right {
  width: 40vw;
}

.ide-bottom-bar-author {
  margin: 0;
  font-size: 16px;
  text-align: center;
  color: grey;
}

.ide-bottom-bar-help {
  color: grey;
  margin: 0 6px;
  font-size: 16px;
}

.ide-bottom-bar-message {
  padding: auto 0;
  margin: 0 6px;
  font-size: 16px;
  color: #5c6bc0;
}

/* Terminal */
/* .ide-terminal-container {
  width: 100%;
  height: 40%;
  display: block;
  position: fixed;
  clear: both;
  left: 18vw !important;
  bottom: 3vh !important;
  background: #1e1e1e77;
  border-top: 1px solid #61616161;
}

.ide-terminal-appbar {
  width: 100%;
  height: 48px;
  border-top: 1px solid #61616161;
}

.ide-terminal-flex {
  height: 46px;
}

.ide-terminal-url {
  height: 32px !important;
  margin: auto 6px !important;
  max-width: 230px !important;
  width: fit-content !important;
}

.ide-terminal-passwd {
  height: 32px !important;
  margin: auto 6px !important;
  width: 100px !important;
}

.ide-terminal-button {
  margin-right: 6px;
} */

/*覆盖样式 */
.mu-expansion-toggle-btn.mu-button {
  margin-left: auto;
  margin-right: -12px;
  color: rgba(221, 207, 207, 0.67) !important;
  -webkit-transform: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  transform: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.mu-text-field-input {
  color: rgba(221, 207, 207, 0.67) !important;
}

.mu-expansion-panel__expand .mu-expansion-panel-header {
  min-height: 48px !important;
}

.mu-expansion-panel-content {
  padding: 6px !important;
}

.monaco-editor,
.monaco-editor-background,
.monaco-editor .inputarea.ime-input {
  background-color: #1e1e1e;
  height: calc(97vh-48px) !important;
  width: 85vw !important;
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

.mu-appbar-title {
  font-size: 18px !important;
  color: #e0e0e0;
}

.mu-dialog {
  background-color: #424242 !important;
}

.mu-dialog-title {
  color: rgba(221, 207, 207, 0.67) !important;
}
</style>

<style scoped>
.terminal-container {
  position: relative;
  width: 100%;
  height: 600px;
  border-top: 2px solid #61616161;
}

.ide-file-tabs {
  height: 48px;
}

.ide-file-body {
  height: calc(100% - 50px);
}
</style>

<style>
.terminal-container .terminal.xterm {
  padding: 0 10px;
}
</style>
