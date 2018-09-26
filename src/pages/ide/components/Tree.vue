<template>
  <div>
    <div class="pane" :style="{ minWidth: '280px', maxWidth: '280px',padding:'0' }">
      <div>
        <mu-flex direction="column" class="ide-side-bar">
          <!-- 文件结构 嵌套列表的方式 -->
          <mu-expansion-panel @change="update_tree()" class="ide-panel">
            <div slot="header" class="ide-panel-header">
              <mu-button flat small color="grey">
                <mu-icon left value="folder"></mu-icon>
                Root DIR
              </mu-button>
            </div>
            <mu-divider class="ide-panel-divider"></mu-divider>
            <!-- file List -->
            <div class="outer-container">
              <div class="inner-container">

                <mu-list toggle-nested class="ide-list content" :value="list_index" @change="handleChange">

                  <mu-list-item v-for="(i,index) in root_files.children" :key="index" :value="i.index" button :ripple="false" @click="get_code('',i.name,i.children)" nested>

                    <mu-icon v-if="i.children" value="folder" style="padding:6px" color='blue'></mu-icon>
                    <mu-icon v-if="!i.children" value="description" style="padding:6px" color='orange200'></mu-icon>

                    <mu-list-item-title style="color:#fff">{{i.name}}</mu-list-item-title>

                    <mu-button v-show="i.index===list_index&&!i.children" icon small @click="del_file">
                      <mu-icon value="delete" color="red300"></mu-icon>
                    </mu-button>

                    <!-- <mu-button v-show="i.index===list_index&&!i.children" icon small @click="get_file">
                            <mu-icon value="get_app" color="blue"></mu-icon>
                          </mu-button> -->

                    <mu-button v-show="i.index===list_index&&!i.children" icon small @click="excute_script">
                      <mu-icon value="play_arrow" color="success"></mu-icon>
                    </mu-button>

                    <!-- <mu-tooltip placement="left-start"> -->
                    <mu-icon v-if="i.children" class="toggle-icon" size="24" color='grey' value="keyboard_arrow_down"></mu-icon>
                    <!-- <mu-button icon small @click="del_folder(i.name)"
                            slot='content'>
                            <mu-icon value="delete" color="red300"></mu-icon>
                          </mu-button> -->
                    <!-- </mu-tooltip> -->
                    <!-- 二级目录 -->
                    <mu-list-item v-for="j in i.children" :key="j.name" button :ripple="false" @click="get_code(i.name,j.name,false)" slot="nested" :value="j.index">
                      <mu-icon value="description" style="padding:6px" color='orange200'></mu-icon>

                      <mu-list-item-title style="color:#fff">{{j.name}}</mu-list-item-title>

                      <mu-button v-show="j.index===list_index" icon small @click="del_file">
                        <mu-icon value="delete" color="red300"></mu-icon>
                      </mu-button>

                      <!-- <mu-button v-show="j.index===list_index" icon small @click="get_file">
                            <mu-icon value="get_app" color="blue"></mu-icon>
                          </mu-button> -->

                      <mu-button v-show="j.index===list_index" icon small @click="excute_script">
                        <mu-icon value="play_arrow" color="success"></mu-icon>
                      </mu-button>

                    </mu-list-item>
                  </mu-list-item>
                </mu-list>

              </div>
            </div>

          </mu-expansion-panel>

          <!-- 创建文件 -->
          <mu-expansion-panel class="ide-panel" :expand="panel === 'panel1'" @change="toggle('panel1')">
            <div slot="header" class="ide-panel-header">
              <mu-button flat small color="grey">
                <mu-icon left value="note_add"></mu-icon>
                New File
              </mu-button>
            </div>
            <mu-flex justify-content="end" align-items="center" direction="column" class="ide-panel-flex">
              <mu-text-field style="width:100%" v-model="new_file_name" placeholder="file name"></mu-text-field>
              <mu-flex style="width:100%" align-items="center" justify-content="end">
                <mu-button small :disabled="!is_connected" @click="new_file()" color="success">add</mu-button>
              </mu-flex>
            </mu-flex>
          </mu-expansion-panel>

          <!-- 创建文件夹 -->
          <mu-expansion-panel class="ide-panel" :expand="panel === 'panel2'" color="grey" @change="toggle('panel2')">
            <div slot="header" class="ide-panel-header">
              <mu-button flat small color="grey">
                <mu-icon left value="create_new_folder"></mu-icon>
                New Folder
              </mu-button>
            </div>
            <mu-flex justify-content="end" align-items="center" direction="column" class="ide-panel-flex">
              <mu-text-field style="width:100%" v-model="new_folder_name" placeholder="folder name"></mu-text-field>
              <mu-flex style="width:100%" align-items="center" justify-content="end">
                <mu-button small :disabled="!is_connected" @click="new_folder()" color="success">add</mu-button>
              </mu-flex>
            </mu-flex>
          </mu-expansion-panel>

          

        </mu-flex>
      </div>
    </div>
    <!--目录结构 结束 -->
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
