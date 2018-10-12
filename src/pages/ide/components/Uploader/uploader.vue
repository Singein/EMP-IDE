<template>
  <div>
    <mu-flex justify-content="center" align-items="center" direction="column" class="uploader">
      <mu-flex style="width:100%;padding-top:6px" align-items="center" justify-content="center">
        <mu-button small @click="browse" color="indigo400" style="margin:0 16px">
          Browser...
        </mu-button>
        <mu-button small color="blue" @click="send">SEND</mu-button>
      </mu-flex>
      <mu-flex direction="column">
        <mu-chip v-for="i in putFilename" :key="i" class="file-chip">
          {{i}}
        </mu-chip>
      </mu-flex>

    </mu-flex>
    <input multiple type="file" ref="fileInput" style="display:none" @change="handleFiles">
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
      index: 0,
    };
  },
  methods: {
    browse() {
      this.$refs["fileInput"].click();
    },

    send() {
      this.$send(this.SIGNAL_PUT_FILE(this));
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


<style scoped>
.file-chip {
  font-size: 16px;

  margin: 8px;
}

.uploader {
  padding-top: 32px;
}
</style>
