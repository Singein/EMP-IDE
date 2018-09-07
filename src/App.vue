<template>
  <div>
    <mu-linear-progress v-if="loading" color="secondary"></mu-linear-progress>
    <mu-flex direction='column'>
      <mu-flex direction='row'>
        <!-- 左侧栏 -->
        <mu-flex direction="column"
          class="ide-side-bar">
          <!-- 文件结构 嵌套列表的方式 -->
          <mu-expansion-panel @change="update_tree()"
            class="ide-panel">
            <div slot="header"
              class="ide-panel-header">
              <mu-button flat small color="grey">
                <mu-icon left value="folder"></mu-icon>
                Root DIR
              </mu-button>
              </div>
            <mu-divider class="ide-panel-divider"></mu-divider>
            <!-- file List -->
            <div class="outer-container">
              <div class="inner-container">

                <mu-list toggle-nested
                  class="ide-list content"
                  :value="list_index"
                  @change="handleChange">

                  <mu-list-item v-for="(i,index) in root_files.children"
                    :key="index"
                    :value="i.index"
                    button
                    :ripple="false"
                    @click="get_code('',i.name,i.children)"
                    nested>

                    <mu-icon v-if="i.children"
                      value="folder"
                      style="padding:6px"
                      color='blue'></mu-icon>
                    <mu-icon v-if="!i.children"
                      value="description"
                      style="padding:6px"
                      color='orange200'></mu-icon>
                    
                      <mu-list-item-title style="color:#fff">{{i.name}}</mu-list-item-title>
                   
                        <mu-button v-show="i.index===list_index&&!i.children" icon small @click="del_file">
                          <mu-icon value="delete" color="red300"></mu-icon>
                        </mu-button>
                    
             
                        <mu-button v-show="i.index===list_index&&!i.children" icon small @click="get_file">
                          <mu-icon value="get_app" color="blue"></mu-icon>
                        </mu-button>
                     
                                         
                        <mu-button v-show="i.index===list_index&&!i.children" icon small @click="excute_script">
                          <mu-icon value="play_arrow" color="success"></mu-icon>
                        </mu-button>
                    
                    <!-- <mu-tooltip placement="left-start"> -->
                      <mu-icon v-if="i.children"
                        class="toggle-icon"
                        size="24"
                        color='grey'
                        value="keyboard_arrow_down"></mu-icon>
                        <!-- <mu-button icon small @click="del_folder(i.name)"
                           slot='content'>
                          <mu-icon value="delete" color="red300"></mu-icon>
                        </mu-button> -->
                    <!-- </mu-tooltip> -->
                    <!-- 二级目录 -->
                    <mu-list-item v-for="j in i.children"
                      :key="j.name"
                      button
                      :ripple="false"
                      @click="get_code(i.name,j.name,false)"
                      slot="nested"
                      :value="j.index">
                      <mu-icon value="description"
                        style="padding:6px"
                        color='orange200'></mu-icon>

                      <mu-list-item-title style="color:#fff">{{j.name}}</mu-list-item-title>
                     
                        <mu-button v-show="j.index===list_index" icon small @click="del_file">
                          <mu-icon value="delete" color="red300"></mu-icon>
                        </mu-button>
                     
                  
                        <mu-button v-show="j.index===list_index" icon small @click="get_file">
                          <mu-icon value="get_app" color="blue"></mu-icon>
                        </mu-button>
                   
                
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
          <mu-expansion-panel class="ide-panel"
            :expand="panel === 'panel1'"
            @change="toggle('panel1')">
            <div slot="header"
              class="ide-panel-header">
              <mu-button flat small color="grey">
                <mu-icon left value="note_add"></mu-icon>
                New File
              </mu-button>
            </div>
            <mu-flex justify-content="end"
              align-items="center"
              direction="column"
              class="ide-panel-flex">
              <mu-text-field style="width:100%"
                v-model="new_file_name"
                placeholder="file name"></mu-text-field>
              <mu-flex style="width:100%"
                align-items="center"
                justify-content="end">
                <mu-button small
                  @click="new_file()"
                  color="success">add</mu-button>
              </mu-flex>
            </mu-flex>
          </mu-expansion-panel>

          <!-- 创建文件夹 -->
          <mu-expansion-panel class="ide-panel"
            :expand="panel === 'panel2'"
            color="grey"
            @change="toggle('panel2')">
            <div slot="header"
              class="ide-panel-header">
              <mu-button flat small color="grey">
                <mu-icon left value="create_new_folder"></mu-icon>
                New Folder
              </mu-button>
            </div>
            <mu-flex justify-content="end"
              align-items="center"
              direction="column"
              class="ide-panel-flex">
              <mu-text-field style="width:100%"
                v-model="new_folder_name"
                placeholder="folder name"></mu-text-field>
              <mu-flex style="width:100%"
                align-items="center"
                justify-content="end">
                <mu-button small
                  @click="new_folder()"
                  color="success">add</mu-button>
              </mu-flex>
            </mu-flex>
          </mu-expansion-panel>

          <!-- 发送文件 -->
          <mu-expansion-panel class="ide-panel"
            :expand="panel === 'panel3'"
            color="grey"
            @change="toggle('panel3')">
            <div slot="header"
              class="ide-panel-header">
              <mu-button flat small color="grey">
                <mu-icon left value="send"></mu-icon>
                Send File
              </mu-button>
            </div>
            <mu-flex justify-content="end"
              align-items="center"
              direction="column"
              class="ide-panel-flex">

              <p id="filename"
                style="color:#5c6bc0;font-size:14px;text-align:center">none selected. </p>

              <mu-flex style="width:100%;padding-top:6px"
                align-items="center"
                justify-content="end">
                <mu-button small
                  @click="file_input()"
                  color="indigo400"
                  style="margin:0 6px">
                  Browser...
                </mu-button>
                <mu-button :disabled="!is_connected"
                  color="blue"
                  small
                  @click="send_button_clicked()">SEND</mu-button>
              </mu-flex>
              <!-- <p id="file-status"
                style="margin:12px 0;font-size:14px;color:#5c6bc0"></p> -->
            </mu-flex>

            <input type="file"
              ref="file_dialog"
              style="display:none">
          </mu-expansion-panel>

        </mu-flex>
        <!-- 左侧栏 结束 -->

        <!-- 编辑器区域 -->
        <mu-flex direction="column"
          class="ide-top-bar">
          <!-- 顶栏 -->
          <mu-appbar v-if="!showTerm && opened_file!==''" class="ide-top-bar-appbar" 
            :z-depth="0" 
            color="#252526"> 
            {{opened_file.split('/')[1]}}
            <mu-button v-if='opened_file!==""' icon small slot="left" @click="update_code()">
              <mu-icon color="grey" value="save"></mu-icon>
            </mu-button>
          </mu-appbar>
          <!-- monaco编辑器 -->
          <m-monaco-editor class="ide-editor"
            v-if='opened_file!==""'
            v-model="code"
            :mode="mode"
            :theme="theme"
            :syncInput="true"
            :fontSize="20"></m-monaco-editor>
        </mu-flex>
      </mu-flex>

      <!-- 底栏 -->
      <mu-flex class="ide-bottom-bar"
        justify-content="end"
        align-items="center">

        <mu-flex class="ide-bottom-bar-left"
          justify-content="start"
          align-items="center">
          <p class="ide-bottom-bar-author">MicroIDE@1ZLAB</p>
          <a href="http://dev.1zlab.com/help" class="ide-bottom-bar-help" target="_blank">Help</a>
        </mu-flex>

        <mu-flex class="ide-bottom-bar-center"
          justify-content="start"
          align-items="center">
          <!-- Terminal Icon -->
          <mu-button small
            flat
            color="grey"
            @click="showTermDialog">
            <mu-icon value="keyboard_arrow_right"></mu-icon>
            Terminal
          </mu-button>
          
        </mu-flex>

        <mu-flex class="ide-bottom-bar-right"
          justify-content="end"
          align-items="center">
          <!-- Message area  -->
          <p id="file-status"
            class="ide-bottom-bar-message"></p>
          <!-- Settings Icon -->
          <mu-button small
            icon
            color="grey">
            <mu-icon value="settings"></mu-icon>
          </mu-button>
        </mu-flex>

      </mu-flex>

    </mu-flex>

    <!-- terminal container -->
    <div v-show="showTerm"
      class="ide-terminal-container">
      <mu-appbar :z-depth="0"
        class="ide-terminal-appbar"
        color='#1e1e1e'
        title="Title">
        <mu-button slot="left"
          icon
          @click="closeFullscreenDialog">
          <mu-icon value="keyboard_arrow_down"
            color="grey"></mu-icon>
        </mu-button>
        <mu-flex class="ide-terminal-flex"
          justify-content="end"
          align-items="center">
          <!-- 部署按钮 -->
          <mu-button small
            icon
            color="grey"
            @click="deploy()">
            <mu-icon value="cloud_download"></mu-icon>
          </mu-button>

          <mu-text-field class="ide-terminal-url"
            :disabled="is_connected"
            color="#61616161"
            v-model="url"
            placeholder="ws://192.168.xxx.xxx:8266/"></mu-text-field>
          <mu-button class="ide-terminal-button"
            color="secondary"
            small
            @click="connect_button_clicked()">{{button_text}}</mu-button>

        </mu-flex>
      </mu-appbar>
      <!-- terminal -->
      <mu-flex ref="term_container"
        direction="row"
        class="ide-terminal-term">
        <div v-show="true"
          ref="term"
          style="width:100%"></div>
      </mu-flex>
    </div>

  </div>
</template>

<script src="./ide.js"></script>
<style src="../static/css/ide.css"></style>


