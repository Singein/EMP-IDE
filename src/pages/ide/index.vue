<template>
  <multipane class="pane-layout" layout="vertical">
    <div class="tree">
      <file-list></file-list>
    </div>
    <multipane-resizer></multipane-resizer>

    <multipane class="subpane-layout" layout="horizontal">
      <div class="editor">

      </div>
      <multipane-resizer></multipane-resizer>

      <div class="terminal-container">
        <div class="terminal">
          <cli ref='cli'></cli>
        </div>
      </div>

    </multipane>

  </multipane>
</template>

<script>
import FileList from "./components/FileList";
import Editor from "./components/Editor";
import Cli from "./components/Cli";
import { Multipane, MultipaneResizer } from "./components/Multipane";

export default {
  components: {
    FileList,
    Editor,
    Multipane,
    MultipaneResizer,
    Cli
  },
  data() {
    return {
      loading: false
    };
  },

  mounted() {
    
  },

  beforeDestroy() {},

  methods: {
    connect(){
      this.$refs['cli'].connect('ws://192.168.2.189:8266','0909')
    }
  },
  watch: {}
};
</script>

<style scoped>
.bg {
  background: #1e1e1e;
}

.pane-layout {
  width: 100%;
  height: 97vh;
}

.tree {
  padding: 0;
  overflow: hidden;
  background: #252526;
  min-width: 0;
  width: 20%;
  max-width: 60%;
}

.subpane-layout {
  max-width: 100%;
  height: 100%;
  flex-grow: 1;
  border-left: 2px solid #61616161;
}

.editor {
  padding: 0;
  overflow: hidden;
  background: #1e1e1e;
  min-height: 48px;
  height: 60%;
  max-height: calc(100%-48px);
}

.terminal-container {
  border-top: 2px solid #61616161;
  flex-grow: 1;
  padding: 0;
  overflow: hidden;
  background: #1e1e1e;
}

.terminal{
  flex-grow: 1;
}

</style>
