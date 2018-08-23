import os


def dir_tree(path='/'):
    root = dict(files=[], folders={})
    dirs = os.listdir(path)
    for i in dirs:
        try:
            files = os.listdir(i)
            root['folders'][i] = files
        except:
            root.get('files').append(i)
    return root


print(dir_tree('.'))