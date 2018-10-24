![Logo](./static/image/logo.png)

# EMP IDE

EasyMicroPython(EMP) IDE 是由1Z实验室引导的一个开源项目，旨在为MicroPython社区提供更高效便捷的开发体验，你可以通过访问我们的网址：[emp.1zlab.com](emp.1zlab.com) 来使用EMP IDE，虽然它在线托管，但与您的主板的所有交互仍然在您自己的网络中进行。目前支持最新版本的Firefox和Chrome。

EMP IDE受到了MicroPython/webrepl 项目的启发，采用了其现有的通信协议，并对webrepl模块进行了改造，设计并实现了一些功能模块，这使得与MicroPython相关的交互变得更加简单。

![](http://src.1zlab.com/empide-guide/connected.png)

## Future

- Monaco Eidtor
- 在线编辑并同步脚本文件
- 基于xterm的终端
- 支持文件目录的新建,删除,重命名等必要操作
- 支持一键运行脚本
- 显示系统固件,内存状态等信息
- 多文件批量上传,支持拖拽上传操作
- 文件搜索

## 使用说明文档

[emp-1zlab-user-guide](http://1zlab.com/doc/emp)

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



## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, 1zlab

