<template>
  <div>
    <mu-dialog title="MicroIDE Settings" width="400" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openSetting">

      <mu-flex direction='column'>
        <mu-text-field label="Url" :disabled="is_connected" color="primary" v-model="url" full-width placeholder="ws://192.168.xxx.xxx:8266/"></mu-text-field>

        <mu-text-field label="Password" :disabled="is_connected" color="primary" v-model="passwd" full-width placeholder="password" type="password"></mu-text-field>

        <mu-text-field label="Editor fontsize" color="primary" v-model="fontSize" full-width placeholder="editor fontsize"></mu-text-field>

      </mu-flex>

      <mu-button slot="actions" flat color="primary" @click="closeSettings()">Close</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  },
  mounted: function() {
    this.$nextTick(function() {});
  },
  methods: {}
};
</script>

<style scoped>
</style>
