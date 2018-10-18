<template>
  <div>
    <mu-dialog title="Connect to your device" width="400" max-width="80%" :esc-press-close="true" :overlay-close="false" :open.sync="show">

      <mu-flex direction='column'>
        <!-- <mu-text-field label="Url"
          color="primary"
          v-model="url"
          full-width
          placeholder="ws://192.168.xxx.xxx:8266/"></mu-text-field> -->

        <mu-auto-complete :data="espIP" label="url" :max-search-results="5" placeholder="ws://192.168.xxx.xxx:8266/" full-width v-model="url" open-on-focus></mu-auto-complete>

        <mu-text-field label="Password" color="primary" v-model="passwd" full-width placeholder="password" type="password"></mu-text-field>
      </mu-flex>

      <mu-button slot="actions" flat color="primary" @click="connect">{{buttonText}}</mu-button>
      <mu-button slot="actions" flat color="primary" @click="esc">ESC</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "config",
  props: ["show", "wsStatus"],
  data() {
    return {
      url: "",
      espIP: [],
      passwd: ""
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getCookies();
      if (this.$cookie.get("url") != null) {
        this.espIP.push(this.$cookie.get("url"));
      }
      axios
        .get("http://www.1zlab.com/ide/get/ip/")
        .then(r => this.espIP.push(...r.ip.map(ip => `ws://${ip}:8266`)));
    });
  },
  computed: {
    buttonText: function() {
      if (!this.wsStatus) {
        return "connect";
      } else {
        return "disconnect";
      }
    }
  },

  methods: {
    connect() {
      this.setCookies();

      if (!this.wsStatus) {
        this.$emit("connect", {
          url: this.url,
          passwd: this.passwd
        });
        this.$emit("hide");
      } else {
        this.$emit("disconnect");
        this.$emit("hide");
      }
    },

    esc() {
      this.setCookies();
      this.$emit("hide");
    },

    getCookies() {
      if (this.$cookie.get("url") != null) {
        this.url = this.$cookie.get("url");
      }
      if (this.$cookie.get("passwd") != null) {
        this.passwd = this.$cookie.get("passwd");
      }
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
