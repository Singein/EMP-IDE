import Terminal from "../term.js";
// import { Terminal } from "xterm";
var put_file_data = null;
var put_file_name = null;
var get_file_name = null;
var get_file_data = null;
export default {
  name: "App",
  components: {},
  data() {
    return {
      size: [document.body.clientWidth, document.body.clientHeight],
      code: "",
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
      // 显示终端
      showTerm: false,
      // websocket对象
      ws: null,
      url: "ws://192.168.2.200:8266/",
      // ws是否连接
      is_connected: false,
      // terminal对像
      term: null,

      // 字节流标志
      binary_state: 0,

      new_file_name: "",
      new_folder_name: "",

      // 上一条命令记录
      last_command: "",
      // websocket 返回数据接受对象
      ws_return: "",

      button_text: "connect"
    };
  },

  mounted: function() {
    this.$nextTick(function() {
      var _size = this.calculate_size();
      // 初始化term对象,完成视图的渲染
      this.$refs.file_dialog.addEventListener(
        "change",
        this.handle_put_file_select,
        false
      );
      this.term = new Terminal({
        cols: _size[0],
        rows: _size[1],
        useStyle: true,
        screenKeys: true,
        cursorBlink: false
      });
      this.term.open(this.$refs.term);
      const that = this;
      window.onresize = () => {
        return () => {
          window.screenWidth = document.body.clientWidth;
          window.screenHeight = document.body.clientHeight;
          that.size = [window.screenWidth, window.screenHeight];
        };
      };
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

    calculate_size() {
      var cols = Math.max(100, Math.min(200, (this.size[0] - 64) / 10)) | 0;
      if (this.size[0] <= 1366)
        var rows = Math.max(24, Math.min(26, (this.size[1] - 180) / 19)) | 0;
      else var rows = Math.max(24, Math.min(35, (this.size[1] - 180) / 19)) | 0;
      return [cols, rows];
    },

    handleChange(val) {
      this.list_index = val;
    },

    help() {
      location.href = "/doc";
    },

    new_file() {
      this.last_command = "new_file('" + this.new_file_name + "')\r";
      this.ws.send(this.last_command);
    },

    del_file() {
      this.last_command = "del_file('" + this.opened_file + "')\r";
      this.ws.send(this.last_command);
    },

    new_folder() {
      this.last_command = "create_folder('" + this.new_folder_name + "')\r";
      this.ws.send(this.last_command);
    },

    del_folder(folder) {
      this.last_command = "del_folder('" + folder + "')\r";
      this.ws.send(this.last_command);
    },

    excute_script() {
      this.last_command = "excute_script";
      this.ws.send(
        "exec(open('" + this.opened_file + "').read(), globals())\r"
      );
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
      if (this.root_files.length === 0) {
        this.last_command = "tree()\r";
        this.ws.send(this.last_command);
      }
    },

    deploy() {
      var tools = `import os
import os
import json
import gc


def tree(path='/'):
    root = dict(name=path, children=[])
    index = 0
    dirs = os.listdir(path)
    for i in dirs:
        try:
            root['children'].append(
                dict(name=i, children=[dict(name=j) for j in os.listdir(i)]))
        except:
            root['children'].append(dict(name=i))

    for i in root['children']:
        if not i.get('children', False):
            i['index'] = index
            index += 1
        else:
            for j in i['children']:
                j['index'] = index
                index += 1
    print(json.dumps(root))
    gc.collect()


def get_code(filename):
    gc.collect()
    with open(filename, 'r') as f:
        print(f.read())


def update_code(filename, content):
    gc.collect()
    with open(filename, 'w') as f:
        print(f.write(content))


def create_folder(folder):
    try:
        os.mkdir(folder)
    except:
        pass
    tree()


def new_file(filename):
    update_code(filename, '')
    tree()


def del_folder(folder):
    for i in os.listdir(folder):
        os.remove(folder + '/' + i)
    os.rmdir(folder)
    tree()


def del_file(filename):
    os.remove(filename)
    tree()

`;
      var uint8array = new TextEncoder().encode(tools.replace(/\r\n/g, "\n"));
      put_file_name = "microide.py";
      put_file_data = uint8array;
      this.put_file();
    },

    file_input() {
      this.$refs.file_dialog.click();
    },

    send_button_clicked() {
      this.put_file();
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
        this.term.write("\x1b[31mWelcome to 1ZLAB-MicroIDE!\x1b[m\r\n");

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
                  if (put_file_name === "microide.py") {
                    this.ws.send("from microide import *\r");
                  }
                  put_file_data = null;
                } else {
                  this.update_file_status("Failed sending " + put_file_name);
                }
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
        // console.log("put file data", put_file_data);
        // console.log(put_file_name + " - " + put_file_data.length + " bytes");
        document.getElementById("filename").innerHTML = put_file_name;
      };
      reader.readAsArrayBuffer(f);
    },

    get_file() {
      this.last_command = "download_file";
      var blob = new Blob([this.code], { type: "text/plain;charset=utf-8" });
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
      this.update_file_status("Sending " + put_file_name + "...");
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
    size: function() {
      var _size = calculate_size();
      this.term.resize(_size[0], _size[1]);
    },
    ws_return: function() {
      if (this.ws_return.endsWith(">>> ")) {
        // console.log("raw:", this.ws_return);
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
          try {
            // console.log("root files changed by ", this.last_command);
            // console.log('root_files',root_files)
            this.root_files = JSON.parse(root_files);
          } catch (e) {
            // console.log(e);
            this.ws_return = "";
            this.last_command = "";
          }

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