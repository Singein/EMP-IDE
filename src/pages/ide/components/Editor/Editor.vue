<template>
  <div>
    <div class="pane ide-file-tabs">
      <mu-appbar v-if="opened_file!==''" class="ide-top-bar-appbar" :z-depth="0" color="#252526">
        {{opened_file.split('/')[1]}}
        <mu-button v-if='opened_file!==""' icon small slot="left" @click="update_code()">
          <mu-icon color="grey" value="save"></mu-icon>
        </mu-button>
      </mu-appbar>
    </div>
    <div class="ide-file-body">
      <m-monaco-editor class="ide-editor" v-if='opened_file!==""' v-model="code" :mode="mode" :theme="theme" :syncInput="true" :fontSize="parseInt(fontSize)"></m-monaco-editor>
    </div>
  </div>
</template>

<script>
import signals from "./signals.js";
import slots from "./slots.js";
import listener from "../../plugins/mixinEventsListener.js";
import onEvent from "../../plugins/mixinOnEvents.js";
export default {
  name: "editor",
  mixins: [signals, slots, listener, onEvent],
  props: ["code", "mode", "theme", "fontSize"],
  data() {
    return {
      code: "",
      fontSize: 16,
      mode: "python",
      theme: "vs-dark",
      // 当前文件
      opened_file: ""
    };
  },
  mounted: function() {
    this.$nextTick(function() {});
  },
  methods: {}
};
</script>

<style scoped>
.ide-file-tabs {
  height: 48px;
}

.ide-file-body {
  height: calc(100% - 50px);
}
</style>
