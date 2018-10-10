<template>
  <div>
    <mu-dialog title="Connect to your device"
      width="400"
      max-width="80%"
      :esc-press-close="true"
      :overlay-close="false"
      :open.sync="show">

      <mu-flex direction='column'>
        <mu-text-field label="Url"
          color="primary"
          v-model="url"
          full-width
          placeholder="ws://192.168.xxx.xxx:8266/"></mu-text-field>

        <mu-text-field label="Password"
          color="primary"
          v-model="passwd"
          full-width
          placeholder="password"
          type="password"></mu-text-field>
      </mu-flex>

      <mu-button slot="actions"
        flat
        color="primary"
        @click="connect">{{buttonText}}</mu-button>
      <mu-button slot="actions"
        flat
        color="primary"
        @click="esc">ESC</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  export default {
    name: "config",
    props: ["show"],
    data() {
      return {
        url: "ws://192.168.xxx.xxx:8266/",
        passwd: "",
        buttonText: "connect",
        webSocketStatus: false
      };
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getCookies();
      });
    },

    methods: {
      connect() {
        this.setCookies();
        // this.$send(this.SIGNAL_TOGGLE_SETTINGS(this));

        // if (this.webSocketStatus) {
          this.$emit('connect', {url:this.url, passwd:this.passwd});
          this.$emit('hide')
        // } else {
        //   this.$send(this.SIGNAL_DISCONNECT(this));
        // }
      },

      esc() {
        this.setCookies();
        // this.$send(this.SIGNAL_TOGGLE_SETTINGS(this));
        // this.$emit('connect', {url:this.url, passwd:this.passwd});
        this.$emit('hide');

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
