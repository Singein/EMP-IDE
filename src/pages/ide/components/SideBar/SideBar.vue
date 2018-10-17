<template>
    <div style="z-index: 999;">
        <div class="pane left-pane">
            <mu-flex justify-content="start" align-items="center" direction="column" style="height:100%">

                <mu-flex justify-content="start" align-items="center" direction="column" style="height:50%">
                    <div :style="changeStyle(0)">
                        <mu-button class="icon-button" icon color="grey" :ripple="false" @click="changePage(0)">
                            <mu-icon size="36" value="code"></mu-icon>
                        </mu-button>
                    </div>
                    <div :style="changeStyle(1)">
                        <mu-button class="icon-button" icon color="grey" :ripple="false" @click="changePage(1)">
                            <mu-icon size="36" value="get_app"></mu-icon>
                        </mu-button>
                    </div>
                    <div :style="changeStyle(2)">
                        <mu-button class="icon-button" icon color="grey" :ripple="false" @click="changePage(2)">
                            <mu-icon size="36" value="search"></mu-icon>
                        </mu-button>
                    </div>
                    <div :style="changeStyle(3)">
                        <mu-button class="icon-button" icon color="grey" :ripple="false" @click="changePage(3)">
                            <mu-icon size="36" value="extension"></mu-icon>
                        </mu-button>
                    </div>
                    <div :style="changeStyle(4)">
                        <mu-button class="icon-button" icon color="grey" :ripple="false" @click="changePage(4)">
                            <mu-icon size="36" value="book"></mu-icon>
                        </mu-button>
                    </div>
                </mu-flex>

                <mu-flex justify-content="end" align-items="center" direction="column" style="height:50%">
                    <mu-button class="icon-button" icon color="green">
                        <mu-icon size="36" value="play_arrow"></mu-icon>
                    </mu-button>
                    <mu-button class="icon-button" icon color="green" @click="clearTerm()">
                        <mu-icon size="36" value="memory"></mu-icon>
                    </mu-button>
                    <mu-button class="icon-button" icon color="yellow" @click="startConnect()">
                        <mu-icon size="36" value="power"></mu-icon>
                    </mu-button>
                </mu-flex>

            </mu-flex>
        </div>
    </div>
</template>

<script>
import signals from "./signals.js";
import slots from "./slots.js";
import listener from "../../plugins/mixinEventsListener.js";
import onEvent from "../../plugins/mixinOnEvents.js";
export default {
  name: "sideBar",
  mixins: [signals, slots, listener, onEvent],
  props: [],
  data() {
    return {
      index: 0,
      selectStyle: [{ background: "#4CAF5099" }, { background: "#fff0" }],
      routeMap: ["/ide"],
      connected: false
    };
  },
  mounted: function() {
    this.$nextTick(function() {});
  },
  methods: {
    changePage(index) {
      this.index = index;
      this.$send(this.SIGNAL_SWITCH(this));
    },
    changeStyle(index) {
      if (this.index === index) return this.selectStyle[0];
      return this.selectStyle[-1];
    },
    startConnect() {
      //   this.$send(this.SIGNAL_OPENSET(this));
      this.$send(this.SIGNAL_OPEN_CONFIG(this));
    },
    clearTerm() {
      this.$send(this.SIGNAL_CLEAR(this));
    }
  },
  watch: {}
};
</script>

<style scoped>
.left-pane {
  background: #333333 !important;
  height: 97vh;
  max-width: 72px;
  min-width: 72px;
  padding: 0;
}
.icon-button {
  margin: 10px;
}
</style>
