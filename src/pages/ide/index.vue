<template>
  <div>
    <mu-linear-progress v-if="loading" color="secondary"></mu-linear-progress>
    <mu-flex class="bg" direction='row' justify-content="start">
      <side-bar :listener="signals" @events="$connect"></side-bar>
      <multipane class="pane-layout" layout="vertical" @events="$connect">
        <div class="left-pane">
          <folder-tree ref="folderTree" :listener="signals" @events="$connect"></folder-tree>
        </div>
        <multipane-resizer></multipane-resizer>
        <multipane class="subpane-layout" layout="horizontal" @events="$connect">
          <div class="editor-bar-container">
            <mu-appbar class="editor-bar" color="#252526"></mu-appbar>
          </div>
          <div class="editor">
            <editor :value="code" ref='editor' style="height:100%;width:100%"></editor>
          </div>
          <multipane-resizer></multipane-resizer>
          <div class="terminal-container">
            <div class="terminal">
              <cli ref='cli' :listener="signals" @events="$connect"></cli>
            </div>
          </div>
        </multipane>
      </multipane>
    </mu-flex>
    <setting ref='setting' :listener="signals" @events="$connect" :show="showSettings"></setting>
    <bottom-bar ref='bottomBar' :listener="signals" @events="$connect"></bottom-bar>
  </div>
</template>

<script>
import BottomBar from "./components/BottomBar";
import SideBar from "./components/SideBar";
import { Multipane, MultipaneResizer } from "./components/Multipane";
import FolderTree from "./components/FolderTree";
import Editor from "./components/Editor";
import Cli from "./components/Cli";
import Setting from "./components/Setting";
import slots from "./slots";
import signals from "./signals";
import mixinData from "./props";

export default {
  mixins: [signals, slots, mixinData],
  components: {
    BottomBar,
    SideBar,
    FolderTree,
    Editor,
    Multipane,
    MultipaneResizer,
    Cli,
    Setting
  },

  data() {
    return {
      loading: false,
      showSettings: false,
      settings: null,
      code: '',
    };
  },

  beforeDestroy() {},
  mounted() {},
  methods: {},
  watch: {}
};
</script>

<style scoped>
.bg {
  background: #1e1e1e;
  width: 100%;
}

.pane-layout {
  width: calc(100% - 68px);
  max-width: calc(100% - 68px);
  height: 97vh;
}

.left-pane {
  padding: 0;
  overflow: hidden;
  background: #252526 !important;
  min-width: 0;
  width: 20%;
  max-width: 40%;
  height: 100%;
}

.subpane-layout {
  width: 80%;
  min-width: 60%;
  height: 100%;
  flex-grow: 1;
  border-left: 2px solid #61616161;
}

.editor-tab-container {
  height: 32px;
  width: 100%;
}

.editor-tab {
  height: 32px;
  width: 100%;
}

.editor {
  padding: 0;
  overflow: hidden;
  background: #1e1e1e;
  width: 100%;
  max-height: calc(100% - 48px);
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
}

.mu-appbar {
  height: 36px;
}
</style>
