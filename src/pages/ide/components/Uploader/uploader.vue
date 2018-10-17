<template>
  <div style="background: #252526 !important;height:100%">
    <mu-flex justify-content="center" align-items="center">

      <el-upload style="backgroun: #212121" ref="eluploader" drag action="https://127.0.0.1/posts/" :auto-upload="false" :on-change="handleChange" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">drag to here，or<em> click</em></div>

        <div class="el-upload__tip" slot="tip">
          <mu-button full-width color="primary" @click="send">Upload</mu-button>
        </div>
      </el-upload>

    </mu-flex>
  </div>
</template>

<script>
import signals from "./signals.js";
import slots from "./slots.js";
import listener from "../../plugins/mixinEventsListener.js";
import onEvent from "../../plugins/mixinOnEvents.js";
export default {
  mixins: [signals, slots, listener, onEvent],
  data() {
    return {
      putFilename: [],
      putFileData: [],
      files: null,
      index: 0
    };
  },
  methods: {
    browse() {
      this.$refs["fileInput"].click();
    },

    send() {
      if (this.putFilename.length > 0) this.$send(this.SIGNAL_PUT_FILE(this));
    },

    handleChange(file, fileList) {
      // console.log(typeof file, file);
      // console.log(typeof fileList, fileList);
      // this.files = fileList;
      let that = this;
      // Get the file info and load its data.
      // for (let i = 0; i < this.files.length; i++) {
      let f = file.raw;
      that.putFilename.push(f.name);
      console.log(typeof f, f);
      let reader = new FileReader();
      reader.onload = function(e) {
        console.log("sdfs", e.target.result);
        that.putFileData.push(new Uint8Array(e.target.result));
      };
      reader.readAsArrayBuffer(f);
      // }
    },

    handleFiles(evt) {
      // The event holds a FileList object which is a list of File objects,
      // but we only support single file selection at the moment.
      // var files = evt.target.files;
      this.files = evt.target.files;
      let that = this;
      // Get the file info and load its data.
      for (let i = 0; i < this.files.length; i++) {
        let f = this.files[i];
        that.putFilename.push(f.name);
        let reader = new FileReader();
        reader.onload = function(e) {
          // console.log("sdfs", e.target.result);
          that.putFileData.push(new Uint8Array(e.target.result));
        };
        reader.readAsArrayBuffer(f);
      }

      console.log(this.putFilename);
      console.log(this.putFileData);
    }
  }
};
</script>


<style>
.el-upload-dragger {
  background-color: #212121;
  border: 1px #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 300px;
  /* width: 100%; */
  height: 180px;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-top: 32px;
}
</style>
