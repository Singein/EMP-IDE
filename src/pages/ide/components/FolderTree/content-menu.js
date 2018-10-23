var menu = {
  'file': [{
      text: 'Run 运行',
      code: 'run'
    },
    {
      isdivider: true
    },
    {
      text: 'Rename 重命名',
      code: 'rename'
    },
    {
      isdivider: true
    },
    {
      text: 'Delete 删除',
      code: 'deleteFile'
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
  'folder': [
    {
      text: 'Refresh 刷新',
      code: 'refresh'
    },
    {
      isdivider: true
    },
    {
      text: 'Rename 重命名',
      code: 'rename'
    },
    {
      isdivider: true
    },
    {
      text: 'New File 新建文件',
      code: 'newFile'
    },
    {
      isdivider: true
    },
    {
      text: 'New Folder 新建文件夹',
      code: 'newFolder'
    },
    {
      isdivider: true
    },
    {
      text: 'Delete 删除文件夹',
      code: 'deleteFolder'
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

function isFolder(data) {
  return 'children' in data;
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
