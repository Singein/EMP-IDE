<template>
  <div class="monaco-editor-container">
    <mu-flex direction="column" class="monaco-editor-container">
      <mu-flex class="editor-tabs" justify-content="start" align-items="center">

        <mu-flex justify-content="start" align-items="center" class="editor-tabs-flex">
          <mu-icon value="description" color='grey'></mu-icon>
          <p class="editor-tabs-title">{{openedFile}}</p>
        </mu-flex>
        <mu-flex justify-content="end" align-items="center" class="editor-tabs-flex">
          <mu-button icon color="primary">
            <mu-icon value="save"></mu-icon>
          </mu-button>
          <mu-button icon color="primary">
            <mu-icon value="close"></mu-icon>
          </mu-button>
        </mu-flex>
      </mu-flex>
      <!-- <mu-flex class="editor-tabs" color="white"></mu-flex> -->
      <div ref="monaco-editor-container" class="monaco-editor"></div>
    </mu-flex>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";
// import debounce from "lodash/debounce";
import signals from "./signals.js";
import slots from "./slots.js";
import listener from "../../plugins/mixinEventsListener.js";
import onEvent from "../../plugins/mixinOnEvents.js";

self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === "json") {
      return "./json.worker.bundle.js";
    }
    if (label === "css") {
      return "./css.worker.bundle.js";
    }
    if (label === "html") {
      return "./html.worker.bundle.js";
    }
    if (label === "typescript" || label === "javascript") {
      return "./ts.worker.bundle.js";
    }
    return "./editor.worker.bundle.js";
  }
};

export default {
  name: "Editor",
  mixins: [signals, slots, listener, onEvent],
  props: {
    value: {
      type: String,
      default: ""
    },
    openedFile: {
      type: String,
      default: ""
    },
    theme: {
      type: String,
      default: "vs-dark"
    },
    showMinimap: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: "python"
    },
    syncInput: Boolean,
    fontSize: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      editor: null,
      monaco: null,
      buffer: ""
    };
  },
  watch: {
    value(val, old) {
      if (this.buffer.length !== val.length || this.buffer !== val) {
        this.buffer = val;
        this.editor.setValue(val);
      }
    }
  },
  mounted() {
    this.initEditor();
  },
  beforeDestroy() {
    this.$refs["monaco-editor-container"].innerHTML = "";
  },
  methods: {
    initEditor() {
      var $editorContainer = this.$refs["monaco-editor-container"];
      this.monaco = window.monaco;
      this.editor = monaco.editor.create($editorContainer, {
        value: this.value,
        language: this.mode,
        fontSize: this.fontSize,
        minimap: {
          enabled: this.showMinimap
        }
      });
      this.setTheme(this.theme);
      this.listen();
    },
    listen() {
      let that = this;
      if (this.syncInput) {
        this.editor.onDidChangeModelContent(function() {
          that.buffer = that.editor.getValue();
        });
      }
    },
    setTheme(theme) {
      this.monaco.editor.setTheme(theme);
    },
    layout() {
      this.editor.layout();
    }
  }
};
</script>

<style scoped>
.monaco-editor-container {
  min-height: 350px;
  height: 100%;
  width: 100%;
}
.monaco-editor {
  min-height: 350px;
  height: 100%;
  width: 100%;
  /* padding-top: 6px; */
}
.editor-tabs {
  height: 48px;
  width: 100%;
  background: #252526;
  /* position: fixed; */
  line-height: 48px;
  padding: 0 12px;
}

.editor-tabs-flex {
  width: 50%;
  height: 100%;
}

.editor-tabs-title {
  font-size: 16px !important;
  color: #e0e0e0;
  margin-left: 6px;
}
</style>
