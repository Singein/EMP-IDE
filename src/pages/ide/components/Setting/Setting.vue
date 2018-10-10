<template>
  <div>
    <mu-dialog title="Connect to your device" width="400" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="show">

      <mu-flex direction='column'>
        <mu-text-field label="Url" color="primary" v-model="url" full-width placeholder="ws://192.168.xxx.xxx:8266/"></mu-text-field>

        <mu-text-field label="Password" color="primary" v-model="passwd" full-width placeholder="password" type="password"></mu-text-field>

        <!-- <mu-text-field label="Editor fontsize" color="primary" v-model="fontSize" full-width placeholder="editor fontsize"></mu-text-field> -->

      </mu-flex>

      <mu-button slot="actions" flat color="primary" @click="connect">{{buttonText}}</mu-button>
      <mu-button slot="actions" flat color="primary" @click="esc">ESC</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import signals from "./signals.js";
import slots from "./slots.js";
import listener from "../../plugins/mixinEventsListener.js";
import onEvent from "../../plugins/mixinOnEvents.js";
export default {
  name: "setting",
  mixins: [signals, slots, listener, onEvent],
  props: ["show"],
  data() {
    return {
      url: "ws://192.168.xxx.xxx:8266/",
      passwd: "",
      buttonText: "connect",
      webSocketStatus: false
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getCookies();
    });
  },

  methods: {
    connect() {
      this.setCookies();
      this.$send(this.SIGNAL_TOGGLE_SETTINGS(this));

      if (this.webSocketStatus) {
        this.$send(this.SIGNAL_CONNECT_TO_DEVICE(this));
      } else {
        this.$send(this.SIGNAL_DISCONNECT(this));
      }
    },

    esc() {
      this.setCookies();
      this.$send(this.SIGNAL_TOGGLE_SETTINGS(this));
    },

    getCookies() {
      this.url = this.$cookie.get("url");
      this.passwd = this.$cookie.get("passwd");
    },

    setCookies() {
      this.$cookie.set("url", this.url, {
        expires: "1Y"
      });
      this.$cookie.set("passwd", this.passwd, {
        expires: "1Y"
      });
    }
  }
};
</script>

<style scoped>
</style>
