<template>
    <div style="padding:12px">
        <mu-card style="width: 100%;min-width:300px;margin: 0 auto;">
            <mu-card-header title="EMP" sub-title="make things easy on micropython.">
            </mu-card-header>
            <!-- <mu-card-text>
                emp-1zlab 模块是专门用来完成和empide进行交互的,,,,,
            </mu-card-text> -->
            <mu-card-actions>
                <mu-button flat>下载/更新</mu-button>
            </mu-card-actions>
        </mu-card>
    </div>
</template>


<script>
// import slots from "./slots.js";
// import signals from "./signals.js";
export default {
  name: "pypi",
  //   mixins: [slots, signals],
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(function() {
      // this.files =
    });
  },

  methods: {}
};
</script>


<style scoped>
</style>
