<template>
    <div>
        <mu-flex justify-content="center" align-items="center" direction="column">
            <p class="putFilename">{{putFilename}}</p>
            <mu-flex style="width:100%;padding-top:6px" align-items="center" justify-content="center">
                <mu-button small @click="browse()" color="indigo400" style="margin:0 6px">
                    Browser...
                </mu-button>
                <mu-button small color="blue" @click="send">SEND</mu-button>
            </mu-flex>
        </mu-flex>
        <input type="file" ref="fileInput" style="display:none" @change="handleFiles">
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
      putFilename: "",
      putFileData: null,
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
      var files = evt.target.files;
      let that = this;
      // Get the file info and load its data.
      var f = files[0];
      this.putFilename = f.name;
      var reader = new FileReader();
      reader.onload = function(e) {
        // console.log("sdfs", e.target.result);
        that.putFileData = new Uint8Array(e.target.result);
        console.log(that.putFileData);
      };
      reader.readAsArrayBuffer(f);
    }
  }
};
</script>


<style scoped>
.putFilename {
  font-size: 16px;
  color: white;
}
</style>
