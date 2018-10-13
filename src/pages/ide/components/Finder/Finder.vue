<template>
  <div>
    <mu-auto-complete :data="files" label="input a filename" v-model="filename"></mu-auto-complete>
  </div>
</template>


<script>
import slots from "./slots.js";
export default {
  name: "finder",
  mixins: [slots],
  data() {
    return {
      filename: "",
      files: null
    };
  },
  mounted() {
    this.$nextTick(function() {
      // this.files =
    });
  },

  methods: {
    traverse(node) {
      var files = [];
      var children = node.children;
      if (children != null) {
        for (let i of children) {
          files.push(...this.traverse(i));
        }
      } else files.push(node.name);

      return files;
    }
  }
};
</script>


<style scoped>
</style>
