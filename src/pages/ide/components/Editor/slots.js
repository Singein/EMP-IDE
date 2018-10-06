// import debounce from 'lodash/debounce';
var slots = {
  methods: {
    //打开设置窗口,点击设置按钮时触发

    slotResizeEditor() {
      // debounce(function () {
      this.layout();
      
      // }, 200);
    },

    slotShowCode(kwargs){
      this.value= kwargs.code
    }


  }
}

export default slots
