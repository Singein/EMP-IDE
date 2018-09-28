<template>
  <div>
    <mu-linear-progress v-if="loading" color="secondary"></mu-linear-progress>
    <mu-flex class="bg" direction='row' justify-content="start">
      <side-bar @connect="connect()"></side-bar>
      <multipane class="pane-layout" layout="vertical" @paneResize="resizeTerm">
        <div class="tree">
          <file-list></file-list>
        </div>
        <multipane-resizer></multipane-resizer>
        <multipane class="subpane-layout" layout="horizontal" @paneResizeStop="resizeTerm">
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
    </mu-flex>
    <settings ref='settings' @events="$connect" :show="showSettings"></settings>
    <bottom-bar ref='bottom_bar' @events="$connect"></bottom-bar>
  </div>

</template>

<script>
import BottomBar from "./components/BottomBar";
import SideBar from "./components/SideBar";
import { Multipane, MultipaneResizer } from "./components/Multipane";
import FileList from "./components/FileList";
import Editor from "./components/Editor";
import Cli from "./components/Cli";
import Settings from "./components/Settings";

export default {
  components: {
    BottomBar,
    SideBar,
    FileList,
    Editor,
    Multipane,
    MultipaneResizer,
    Cli,
    Settings
  },

  data() {
    return {
      loading: false,
      showSettings: false,
      parent: this
    };
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    connect() {
      this.vconnect();
      this.$refs["cli"].connect(
        "ws://192.168.0.121:8266",
        "0909"
      );
    },

    resizeTerm(pane, container, size) {
      console.log(pane);
      this.$refs["cli"].resizeTerm();
    },

    slotToggleSettings(signal) {
      this.showSettings = !this.showSettings;
    },
    // slotApplySettings(signal){
    //   this.slotToggleSettings(signal)

    // }
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
  max-width: 40%;
}

.subpane-layout {
  max-width: 100%;
  min-width: 40%;
  height: 100%;
  flex-grow: 1;
  border-left: 2px solid #61616161;
}

.editor {
  padding: 0;
  overflow: hidden;
  background: #1e1e1e;
  width: 100%;
  height: 100%;
  min-height: 48px;
}

.terminal-container {
  border-top: 2px solid #61616161;
  flex-grow: 1;
  /* height: 100%; */
  overflow: hidden;
  background: #1e1e1e;
}

.terminal {
  height: 100%;
  /* flex-grow: 1; */
}
</style>
