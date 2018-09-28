var Connect = {}
Connect.install = function (Vue, options) {

  /**
   * 我想搞一个类似于qt 信号槽的连接函数,只关心 组件和组件间 信号和槽的映射
   * @method $connect
   * @param {Vue object} sender 发送信号的组件
   * @param {Object} signal 信号,包含信号的名字和参数
   * @param {String} receiver 接受者,是vue控件的ref,如果是传递给父组件的信息,则recevier === 'parent'(我规定就是这么传参的)
   * @param {String} slot 槽函数, 规范: 以slot开头 接受者需要执行的函数名字
   */
  Vue.prototype.$connect = function (sender, signal, receiver, slot) {

    // console.log('sender', sender, '\n', 'signal', signal, '\n', 'receiver', receiver, '\n', 'slot', slot)
    if (receiver === 'parent') {
      sender.$parent[slot](signal)
    }
    else{
        try{
            sender.$parent.$refs[receiver][slot](signal)
        }catch(e){
            console.log(e)
        }
    }
    
  }

  Vue.prototype.$send = function (sender, signal, receiver, slot) {

    // console.log('sender', sender, '\n', 'signal', signal, '\n', 'receiver', receiver, '\n', 'slot', slot)
    sender.$emit('events', sender, signal, receiver, slot)
  }

}

export default Connect
