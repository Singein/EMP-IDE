<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <entry></entry>
  </div>
</template>

<script>
// import SideBar from './pages/components'
import Entry from './pages/entry/Entry'

export default {
  name: 'app',
  components:{
    Entry
  }
}
</script>

<style>
@import "assets/style/common";
</style>
