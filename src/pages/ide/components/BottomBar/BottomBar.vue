<template>
  <div>
    <mu-flex :style="background" class="ide-bottom-bar" justify-content="end" align-items="center">
      <!-- 左侧logo help -->
      <mu-flex class="ide-bottom-bar-left" justify-content="start" align-items="center">

      </mu-flex>
      <!-- 中部 terminal 连接 -->
      <mu-flex class="ide-bottom-bar-center" justify-content="start" align-items="center">

      </mu-flex>
      <!-- 右侧设置按钮  -->
      <mu-flex class="ide-bottom-bar-right" justify-content="end" align-items="center">
        <!-- Message area  -->
        <p id="file-status" class="ide-bottom-bar-message"></p>
        <!-- Settings Icon -->
        <mu-button small icon color="grey" @click="toggleSettings">
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
  /* background: #414141; */
  padding-right: 16px;
  color: white;
}

.ide-bottom-bar-left {
  width: 18vw;
  padding-left: 8px;
}

.ide-bottom-bar-center {
  width: 42vw;
  padding-left: 8px;
}

.ide-bottom-bar-right {
  width: 40vw;
}

.ide-bottom-bar-author {
  margin: 0;
  font-size: 16px;
  text-align: center;
  color: grey;
}

.ide-bottom-bar-help {
  color: grey;
  margin: 0 6px;
  font-size: 16px;
}

.ide-bottom-bar-message {
  padding: auto 0;
  margin: 0 6px;
  font-size: 16px;
  color: #5c6bc0;
}
</style>


