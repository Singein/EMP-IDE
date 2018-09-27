<template>
  <div>
    <mu-flex direction="column" class="file-list">
      <div class="outer-container">
        <div class="inner-container">
          <el-tree ref='tree' :data="data" :props="defaultProps" :highlight-current="true" class="tree" :render-content="renderContent" v-on:node-contextmenu="renderMenu"></el-tree>
        </div>
      </div>
    </mu-flex>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      panel: "",
      // data: null,
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  computed: {
    data() {
      return this.$store.tree.data
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      console.log("file list mounted");
      console.log(this.$route.path);
      // this.$refs['tree'].setCurrentNode(this.$store.tree.node)
      // console.log(this.$store.tree.node)
    });
  },

  updated: function() {
    this.$nextTick(function() {
      console.log("file list updated");
    });
  },

  methods: {
    togglePanel(panel) {
      this.panel = panel === this.panel ? "" : panel;
    },

    handleChange(val) {
      // 目录树的index值
      this.list_index = val;
    },

    nodeClicked(data, node, self) {
      // this.$store.commit({
      //   type: "currentNodeChanged",
      //   node: node
      // });
    },

    renderMenu(event, data, node, self) {
      console.log(data.name);
    },

    renderContent(h, { node, data, store }) {
      if (data.children)
        return (
          <mu-flex align-items="center">
            <mu-icon value="folder" size="20" />
            <span class="tree-node-label">{node.label}</span>
          </mu-flex>
        );
      else
        return (
          <mu-flex align-items="center">
            <mu-icon value="description" size="20" />
            <span class="tree-node-label">{node.label}</span>
          </mu-flex>
        );
    }
  }
};
</script>

<style>
.file-list {
  background: #252526;
  width: 100%;
  height: 100%;
  padding: 0;
}

.tree {
  width: 100%;
}

.tree-node-label {
  margin-left: 6px;
}

.outer-container,
.content {
  width: 100%;
  height: 97vh;
}

.outer-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.inner-container {
  width: 300%;
  height: 100%;
  position: absolute;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

.el-tree {
  position: relative;
  cursor: default;
  background: #252526 !important;
  color: rgba(221, 207, 207, 0.67) !important;
}

.el-tree-node__label {
  font-size: 18px !important;
}

.el-tree-node__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 32px !important;
  cursor: pointer;
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #37373d !important;
}

.el-tree-node__content:hover {
  background-color: #37373d;
}

.el-tree-node:focus > .el-tree-node__content {
  background-color: #37373d;
}

.el-tree-node__expand-icon {
  cursor: pointer;
  color: #c0c4cc;
  font-size: 16px;
  -webkit-transform: rotate(0);
  transform: rotate(0);
  -webkit-transition: -webkit-transform 0.3s ease-in-out;
  /* transition: -webkit-transform .3s ease-in-out; */
  /* transition: transform .3s ease-in-out; */
  /* transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out; */
  transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
}
</style>
