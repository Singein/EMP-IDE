import os
import json


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


def get_code(filename):
    with open(filename, 'r') as f:
        print(f.read())


def update_code(filename, content):
    with open(filename, 'w') as f:
        print(f.write(content))
