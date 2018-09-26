<template>
    <div>
        <div class="pane left-pane">
            <mu-flex justify-content="start" align-items="center" direction="column" style="height:100%">

                <mu-flex justify-content="start" align-items="center" direction="column" style="height:50%">
                    <mu-button class="icon-button" icon color="grey">
                        <mu-icon size="36" value="code"></mu-icon>
                    </mu-button>
                    <mu-button class="icon-button" icon color="grey">
                        <mu-icon size="36" value="search"></mu-icon>
                    </mu-button>
                    <mu-button class="icon-button" icon color="grey">
                        <mu-icon size="36" value="extension"></mu-icon>
                    </mu-button>
                    <mu-button class="icon-button" icon color="grey">
                        <mu-icon size="36" value="cloud_download"></mu-icon>
                    </mu-button>
                    <mu-button class="icon-button" icon color="grey">
                        <mu-icon size="36" value="book"></mu-icon>
                    </mu-button>
                </mu-flex>

                <mu-flex justify-content="end" align-items="center" direction="column" style="height:50%">
                    <mu-button class="icon-button" icon color="green">
                        <mu-icon size="36" value="play_arrow"></mu-icon>
                    </mu-button>
                    <mu-button class="icon-button" icon color="yellow">
                        <mu-icon size="36" value="power"></mu-icon>
                    </mu-button>
                </mu-flex>

            </mu-flex>
        </div>
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
.left-pane {
  background: #333333 !important;
  height: 97vh;
  max-width: 72px;
  min-width: 72px;
  padding: 0;
}
</style>
