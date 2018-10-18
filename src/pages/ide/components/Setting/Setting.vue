<template>
  <div>
    <mu-dialog title="EMP IDE configs" width="400" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="show">

      <mu-flex direction='column'>
        <!-- <mu-text-field label="Url"
          color="primary"
          v-model="url"
          full-width
          placeholder="ws://192.168.xxx.xxx:8266/"></mu-text-field>

        <mu-text-field label="Password"
          color="primary"
          v-model="passwd"
          full-width
          placeholder="password"
          type="password"></mu-text-field> -->

        <mu-text-field label="Editor fontsize" color="primary" v-model="fontSize" full-width></mu-text-field>

        <mu-text-field label="Memory limit" color="primary" full-width disabled></mu-text-field>

      </mu-flex>

      <mu-button slot="actions" flat color="primary" @click="apply">Apply</mu-button>
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
      fontSize: 16,
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
    apply() {
      this.setCookies();
      this.$send(this.SIGNAL_TOGGLE_SETTINGS(this));
      this.$send(this.SIGNAL_APPLY_FONTSIZE(this));
    },

    esc() {
      this.setCookies();
      this.$send(this.SIGNAL_TOGGLE_SETTINGS(this));
    },

    getCookies() {
      console.log(this.$cookie.get("fontSize"));
      if (this.$cookie.get("fontSize") != null)
        this.fontSize = parseInt(this.$cookie.get("fontSize"));
    },

    setCookies() {
      this.$cookie.set("fontSize", this.fontSize, {
        expires: "1Y"
      });
    }
  }
};
</script>

<style scoped>
</style>
