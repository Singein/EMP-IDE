<template>
  <div style="z-index: 999;">
    <mu-flex :style="background" class="ide-bottom-bar" justify-content="end" align-items="center">
      <!-- 左侧logo help -->
      <mu-flex class="ide-bottom-bar-left" justify-content="start" align-items="center">
        <a class="info"><strong>{{mpy}}</strong></a>
        <a class="info"><strong>{{platform}}</strong></a>
        <a class="info"><strong>{{memoryFree}}</strong></a>
        <a class="info"><strong>{{memoryAlloced}}</strong></a>
      </mu-flex>
     
      <!-- 右侧设置按钮  -->
      <mu-flex class="ide-bottom-bar-right" justify-content="end" align-items="center">
        <!-- Message area  -->

        <!-- Settings Icon -->
        <mu-button small icon color="white" @click="toggleSettings">
          <mu-icon value="settings"></mu-icon>
        </mu-button>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
import signals from "./signals.js";
import slots from "./slots.js";
import listener from "../../plugins/mixinEventsListener.js";
import onEvent from "../../plugins/mixinOnEvents.js";
// import signalProp from
export default {
  name: "bottomBar",
  mixins: [signals, slots, listener, onEvent],
  props: [],
  data() {
    return {
      showSetting: false,
      // background: 'background: #007acc;',
      connected: false,

      sysInfo: null,
      memoryStatus: null

      // 007acc;
    };
  },

  mounted: function() {
    this.$nextTick(function() {});
  },
  computed: {
    background: function() {
      if (!this.connected) {
        return "background: #414141;";
      } else {
        return "background: #007acc;";
      }
    },
    memoryFree: function() {
      if (this.memoryStatus != null)
        return `Free Memory: ${this.memoryStatus.free} KB`;
      else return "";
    },
    memoryAlloced: function() {
      if (this.memoryStatus != null)
        return `Alloced Memory: ${this.memoryStatus.alloced} KB`;
      else return "";
    },
    platform: function() {
      if (this.sysInfo != null)
        return `${this.sysInfo.platform} v${this.sysInfo.version}`;
      else return "";
    },
    mpy: function() {
      if (this.sysInfo != null)
        return `MicroPython v${this.sysInfo.implementation[1].join(".")}`;
      else return "";
    }
  },
  methods: {
    toggleSettings() {
      this.showSetting = !this.showSetting;
      let signal = {
        event: "openset",

        kwargs: {
          show: this.showSetting
        }
      };

      this.$send(this.SIGNAL_OPENSET(this));
    }
  }
};
</script>

<style scoped>
/* 底栏区域 */
.ide-bottom-bar {
  width: 100vw;
  height: 3vh;
  padding-right: 16px;
  color: white;
}

.ide-bottom-bar-left {
  width: 60vw;
  padding-left: 8px;
}


.ide-bottom-bar-right {
  width: 40vw;
}


.info {
  padding: auto 0;
  margin-left: 12px;
  font-size: 16px;
  color: white;
}
</style>


