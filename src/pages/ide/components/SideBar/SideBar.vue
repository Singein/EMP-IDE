<template>
    <div>
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
                            <mu-icon size="36" value="search"></mu-icon>
                        </mu-button>
                    </div>
                    <div :style="changeStyle(2)">
                        <mu-button class="icon-button" icon color="grey" :ripple="false" @click="changePage(2)">
                            <mu-icon size="36" value="extension"></mu-icon>
                        </mu-button>
                    </div>
                    <div :style="changeStyle(3)">
                        <mu-button class="icon-button" icon color="grey" :ripple="false" @click="changePage(3)">
                            <mu-icon size="36" value="book"></mu-icon>
                        </mu-button>
                    </div>
                </mu-flex>

                <mu-flex justify-content="end" align-items="center" direction="column" style="height:50%">
                    <mu-button class="icon-button" icon color="green">
                        <mu-icon size="36" value="play_arrow"></mu-icon>
                    </mu-button>
                    <mu-button class="icon-button" icon color="green">
                        <mu-icon size="36" value="memory"></mu-icon>
                    </mu-button>
                    <mu-button class="icon-button" icon color="yellow" @click="$connect">
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
      index: -1,
      selectStyle: [{ background: "#4CAF5099" }, { background: "#fff0" }],
      routeMap: ["/ide"],
      connected: false
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      console.log("sider-bar-name:", this.$options.name);
      // console.log("sider-bar-name:",this.$options.ref)
    });
  },
  methods: {
    changePage(index) {
      this.index = index;
      //   this.$router.push(this.routeMap[index])
    },
    changeStyle(index) {
      if (this.index === index) return this.selectStyle[0];
      return this.selectStyle[-1];
    },
    connect() {
      // this.connected = !this.connected
      this.$emit("connect", this.connected);
    }
  },
  watch: {
    $route() {
      //   console.log(this.$route.path)
      this.index = this.routeMap.indexOf(this.$route.path);
    }
  }
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
