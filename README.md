

![Logo](./static/image/logo.png)

# EMP IDE User Guide

EasyMicroPython(EMP) IDE 是由1Z实验室引导的一个开源项目，旨在为MicroPython社区提供更高效便捷的开发体验，你可以通过访问我们的网址：[emp.1zlab.com](emp.1zlab.com) 来使用EMP IDE，虽然它在线托管，但与您的主板的所有交互仍然在您自己的网络中进行。目前支持最新版本的Firefox和Chrome。

EMP IDE受到了MicroPython/webrepl 项目的启发，采用了其现有的通信协议，并对webrepl模块进行了改造，设计并实现了一些功能模块，以此来通过WebSocket实现和MicroPython设备的更丰富，更高效的信息交互。



## 使用之前

首先请使用串口连接工具进入MicroPython的Repl

- 1 使你的MicroPython设备（ESP32/ESP8266)连接到无线网络

   ```python
    import network
    wifi = network.WLAN(network.STA_IF)
    wifi.active(True)
    wifi.connect(essid, passwd)
   ```

- 2 安装emp模块

  ```python
  >>> import upip 
  I (240305) modsocket: Initializing 
  >>> upip.install('emp-1zlab') 
  Installing to: /lib/ 
  Warning: pypi.org SSL certificate is not validated 
  Installing emp-1zlab 0.2.2 from https://files.pythonhosted.org/packages/59/95/b9e425d00c195c9beb2e77c0b02020676115c42762a32d61047650e3884b/emp-1zlab-0.2.2.tar.gz
  >>> 
  
  ```

  

- 3 设置启动模式，注意：该操作会覆盖boot.py中的所有内容

  ```python
  >>> from emp_boot import set_boot_mode
  >>> set_boot_mode()
  
  >>> from emp_boot import set_boot_mode 
  >>> set_boot_mode() 
  [0]  Boot with nothing 
  	 attention: this option will clear up boot.py, careful! 
  [1]  Boot with wifi startup 
    	 this mode will auto start wifi connect program. 
  [2]  Easy to develop 
  	 this mode is for developers.In this mode you can develop much easier via EMP-         IDE(emp.1zlab.com) 
  Please input your choice [0-2]: 
  
  ```

  选择 2

  

## 开始使用EMP IDE
- 请访问 [emp.1zlab.com](emp.1zlab.com)

  ![](http://src.1zlab.com/empide-guide/emp-ide.png)

- 连接至MicroPython设备，url和password使用了cookie。同时，url也使用了局域网ip自动获取。

  ![connect](http://src.1zlab.com/empide-guide/connect.png)

  主界面 Main Page

  ![](http://src.1zlab.com/empide-guide/connected.png)

- 点击底栏，显示/隐藏 terminal 

  ![](http://src.1zlab.com/empide-guide/terminal.png)

- 编辑/查看/保存 文件

  ![](http://src.1zlab.com/empide-guide/open&save.png)

- 右键菜单,支持文件及文件夹的删除，新建，刷新，以及运行

  ![](http://src.1zlab.com/empide-guide/menu.png)

  ![](http://src.1zlab.com/empide-guide/menu-folder.png)

- 上传文件,支持拖拽，多文件上传 

  ![](http://src.1zlab.com/empide-guide/upload.png)

- 文件搜索 Search File

  ![](http://src.1zlab.com/empide-guide/search.png)

- 更新EMP固件 Update EMP

  ![](http://src.1zlab.com/empide-guide/update.png)

- 文档 Docs

  ![](http://src.1zlab.com/empide-guide/docs.png)

- 底部面板，包含运行，清理内存，连接设置按钮，以及版本信息和内存状态的展示

  ![](http://src.1zlab.com/empide-guide/memory.png)







## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# docs
yarn run docs:dev
```





## Document

coming...



## Future

[todo list](https://github.com/Fuermohao/1ZLAB-MicroIDE/wiki/TO-DO)



## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, 1zlab
