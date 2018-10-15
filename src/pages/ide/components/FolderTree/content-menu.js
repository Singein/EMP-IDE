var menu = {
  'file': [{
      text: '运行',
      code: 'run'
    },
    {
      isdivider: true
    },
    {
      text: '重命名',
      code: 'rename'
    },
    {
      isdivider: true
    },
    {
      text: '删除',
      code: 'delete'
    },
    {
      isdivider: true
    },
    // {
    //   text: 'test',
    //   code: 'test',
    //   children: [{
    //     text: 'sub menu',
    //     code: 'test2'
    //   }]
    // }
  ],
  'folder': [{
      text: '新建文件',
      code: 'newFile'
    },
    {
      isdivider: true
    },
    {
      text: '新建文件夹',
      code: 'newFolder'
    },
    {
      isdivider: true
    },
    {
      text: '删除文件夹',
      code: 'delete'
    },
    // {
    //   text: '删除',
    //   code: 'delete'
    // },
    // {
    //   isdivider: true
    // },
    // {
    //   text: 'test',
    //   code: 'test',
    //   children: [{
    //     text: 'sub menu',
    //     code: 'test2'
    //   }]
    // }
  ]
}

function isFolder(node) {
  return node.childNodes.length > 0
}

function showContentMenu($contextmenu, event) {
  var position = {
    left: event.clientX,
    top: event.clientY
  }
  $contextmenu.show(position)
}

function hideContentMenu($contextmenu) {
  $contextmenu.hide()
}

export {
  menu,
  isFolder,
  showContentMenu,
  hideContentMenu
}
