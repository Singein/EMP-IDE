<template>
  <div ref="terminal" class="term">
    <config :show="showConfig" @hide="slotToggleConfig" @connect="slotConnectToDevice"></config>
  </div>
</template>

<script>
import Config from "./Config.vue";
import signals from "./signals.js";
import slots from "./slots.js";
import listener from "../../plugins/mixinEventsListener.js";
import onEvent from "../../plugins/mixinOnEvents.js";
import handleConnection from "./ws.js";
import { Terminal } from "xterm";
import * as fit from "xterm/lib/addons/fit/fit";
import * as attach from "xterm/lib/addons/attach/attach";
import "xterm/dist/xterm.css";
Terminal.applyAddon(fit);
Terminal.applyAddon(attach);

export default {
  name: "cli",
  mixins: [signals, slots, handleConnection, listener, onEvent],
  props: ["tasklock"],
  components: {
    Config
  },
  data() {
    return {
      ws: null,
      term: null,
      recData: null,
      passwd: null,
      showConfig: false,
      termOptions: {
        rows: 15,
        fontSize: 18,
        lineHeight: 1,
        padding: 10,
        allowTransparency: true,
        theme: {
          background: "#1e1e1e"
        }
      }
    };
  },
  mounted: function() {
    window.addEventListener("resize", this.slotResizeTerm);
    this.$nextTick(function() {
      this.initTerm();
    });
  },
  methods: {
    initTerm() {
      this.term = new Terminal(this.termOptions);
      let $terminal = this.$refs["terminal"];
      this.$nextTick(() => {
        this.term.open($terminal);
        this.slotResizeTerm();
      });
    }
  }
};
</script>

<style scoped>
.term {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
}
</style>
