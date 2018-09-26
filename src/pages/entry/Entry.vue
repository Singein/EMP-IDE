<template>
  <div>
    <mu-linear-progress v-if="loading" color="secondary"></mu-linear-progress>
    <mu-flex class="bg" direction='row' justify-content="start">
      <side-bar></side-bar>
      <router-view></router-view>
    </mu-flex>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import BottomBar from "./components/BottomBar";
import SideBar from "./components/SideBar";

export default {
  components: {
    BottomBar,
    SideBar
  },
  data() {
    return {
      loading: false
    };
  },

  mounted() {},

  beforeDestroy() {},

  methods: {},
  watch: {}
};
</script>

<style scoped>
.bg{
  background: #1e1e1e
}
</style>
