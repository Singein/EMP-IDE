<template>
  <div>
    <mu-flex class="ide-bottom-bar" justify-content="end" align-items="center">
      <!-- 左侧logo help -->
      <mu-flex class="ide-bottom-bar-left" justify-content="start" align-items="center">
        <!-- <p class="ide-bottom-bar-author">MicroIDE@1ZLAB</p>
        <a href="http://dev.1zlab.com/help" class="ide-bottom-bar-help" target="_blank">Help</a> -->
        
      </mu-flex>
      <!-- 中部 terminal 连接 -->
      <mu-flex class="ide-bottom-bar-center" justify-content="start" align-items="center">
        <!-- Terminal Icon -->
        <!-- <mu-button small flat color="grey">
          <mu-icon value="keyboard_arrow_right"></mu-icon>
          Terminal
        </mu-button> -->

        <!-- <mu-button flat color="grey" small>
          <mu-icon value="power"></mu-icon>
          {{button_text}}
        </mu-button> -->

      </mu-flex>
      <!-- 右侧设置按钮  -->
      <mu-flex class="ide-bottom-bar-right" justify-content="end" align-items="center">
        <!-- Message area  -->
        <p id="file-status" class="ide-bottom-bar-message"></p>
        <!-- Settings Icon -->
        <mu-button small icon color="grey">
          <mu-icon value="settings"></mu-icon>
        </mu-button>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>


export default {
  props: [],
  data() {
    return {
      
    };
  },
  mounted: function() {
    this.$nextTick(function() {
 
      
    });
  },
  methods: {
  }
};
</script>

<style scoped>
/* 底栏区域 */
.ide-bottom-bar {
  width: 100vw;
  height: 3vh;
  background: #414141;
  padding-right: 16px;
  color: white;
}

.ide-bottom-bar-left {
  width: 18vw;
  padding-left: 8px;
}

.ide-bottom-bar-center {
  width: 42vw;
  padding-left: 8px;
}

.ide-bottom-bar-right {
  width: 40vw;
}

.ide-bottom-bar-author {
  margin: 0;
  font-size: 16px;
  text-align: center;
  color: grey;
}

.ide-bottom-bar-help {
  color: grey;
  margin: 0 6px;
  font-size: 16px;
}

.ide-bottom-bar-message {
  padding: auto 0;
  margin: 0 6px;
  font-size: 16px;
  color: #5c6bc0;
}
</style>


