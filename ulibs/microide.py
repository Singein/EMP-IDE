import os
import json
import gc


def tree(path='/'):
    root = dict(name=path, children=[])
    index = 0
    dirs = os.listdir(path)
    for i in dirs:
        try:
            root['children'].append(
                dict(name=i, children=[dict(name=j) for j in os.listdir(i)]))
        except:
            root['children'].append(dict(name=i))

    for i in root['children']:
        if not i.get('children', False):
            i['index'] = index
            index += 1
        else:
            for j in i['children']:
                j['index'] = index
                index += 1
    print(json.dumps(root))
    gc.collect()


def get_code(filename):
    gc.collect()
    with open(filename, 'r') as f:
        print(f.read())


def update_code(filename, content):
    gc.collect()
    with open(filename, 'w') as f:
        print(f.write(content))


def create_folder(folder):
    try:
        os.mkdir(folder)
    except:
        pass
    tree()


def new_file(filename):
    update_code(filename, '')
    tree()


def del_folder(folder):
    for i in os.listdir(folder):
        os.remove(folder + '/' + i)
    os.rmdir(folder)
    tree()


def del_file(filename):
    os.remove(filename)
    tree()


def rainbow(output, color=None):
    """
    字符串,彩色输出
    """
    if color:
        if color == 'green':
            return '\033[1;32m%s\033[0m' % output
        if color == 'red':
            return '\033[1;31m%s\033[0m' % output
        if color == 'blue':
            return '\033[1;34m%s\033[0m' % output
    else:
        return output


def mem_analyze(func):
    """
    装饰器:内存分析
    """

    def wrapper(*args, **kwargs):
        memory_alloc = 'memory alloced: %s kb' % str(gc.mem_alloc() / 1024)
        memory_free = 'memory free: %s kb' % str(gc.mem_free() / 1024)
        gc.collect()
        memory_after_collect = 'after collect: %s kb available' % str(
            gc.mem_free() / 1024)
        print(rainbow(memory_alloc, color='red'))
        print(rainbow(memory_free, color='green'))
        print(rainbow(memory_after_collect, color='blue'))
        func(*args, **kwargs)
        memory_after_func_excute = 'after %s excuted: %s kb available' % (
            func.__name__, str(gc.mem_free() / 1024))
        print(rainbow(memory_after_func_excute, color='red'))

    return wrapper
