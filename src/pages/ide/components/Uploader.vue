<template>
  <div>
    <!-- 发送文件 -->
    <mu-expansion-panel class="ide-panel" :expand="panel === 'panel3'" color="grey" @change="toggle('panel3')">
      <div slot="header" class="ide-panel-header">
        <mu-button flat small color="grey">
          <mu-icon left value="send"></mu-icon>
          Send File
        </mu-button>
      </div>
      <mu-flex justify-content="end" align-items="center" direction="column" class="ide-panel-flex">

        <p id="filename" style="color:#5c6bc0;font-size:14px;text-align:center">{{send_file_name}}
        </p>

        <mu-flex style="width:100%;padding-top:6px" align-items="center" justify-content="end">
          <mu-button small :disabled="!is_connected" @click="file_input()" color="indigo400" style="margin:0 6px">
            Browser...
          </mu-button>
          <mu-button :disabled="!is_connected" color="blue" small @click="send_button_clicked()">SEND</mu-button>
        </mu-flex>
        <!-- <p id="file-status"
                  style="margin:12px 0;font-size:14px;color:#5c6bc0"></p> -->
      </mu-flex>

      <input type="file" ref="file_dialog" style="display:none" @change="handle_put_file_select">
    </mu-expansion-panel>
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
