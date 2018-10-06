<template>
  <div>
    <div class="ide-file-tabs">
      <mu-appbar class="ide-top-bar-appbar" :z-depth="0" color="#252526">
        main.py
        <mu-button icon small slot="left">
          <mu-icon color="grey" value="save"></mu-icon>
        </mu-button>
      </mu-appbar>
    </div>
    <div class="ide-file-body">
      <m-monaco-editor ref='editor' class="ide-file-body" v-model="code" :mode="mode" :theme="theme" :syncInput="true" :fontSize="parseInt(fontSize)"></m-monaco-editor>
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
  // props: ["code", "mode", "theme", "fontSize"],
  data() {
    return {
      code: "print('hello')",
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
  height: 100%;
  width: 100%;
}
</style>
