import os
import shutil

flask_path = './server'
vue_path = '.'
index_html = ''


with open(vue_path + '/dist/index.html', 'r') as f:
    index_html = f.read()
    print('reading index.html...')


def get_html():
    print("auto creating new index.html...")
    html_main = index_html.split('</div>')[0] + '</div>\n'
    html_left = index_html.split('</div>')[1]
    # print(html_main)
    # print('\n---------------------------\n')
    # print(html_left)
    # print('\n---------------------------\n')
    script_tags = html_left.split('</script>')
    # print(script_tags[0])
    # print(script_tags[1])
    # print(script_tags[2])
    html_left = ''
    for i in range(0, 3):
        script_main = script_tags[i].split('src=/')[0] + 'src='
        script_left = script_tags[i].split('src=/')[1]
        filename = script_left.split('/')[2].split('>')[0]
        script_left = "\"{{url_for('static',filename=\'js/" + \
            filename + "\')}}\"" + "></script>"
        script_main += script_left
        # print(script_main)

        html_left += script_main + "\n"
    html_left += '</body>\n\n</html>'
    # print('\n---------------------------\n')
    new_html = html_main + html_left
    print("new index.html auto created")
    return new_html


def overwrite_file(new_html):
    with open(flask_path + '/templates/index.html', 'w') as f:
        f.write(new_html)
    print('index.html replaced')

def del_static(des_path):
    try:
        os.system('rm -rf '+des_path)
        print(des_path,'removed.')
    except:
        pass


def copy_static(src_path,des_path):
    os.system('cp -rp '+ src_path +' '+ des_path)
    print('copy finish')

if __name__ == '__main__':
    new_html = get_html()
    overwrite_file(new_html)
    # shutil.rmtree(flask_path+'/static', True)
    # shutil.copytree(vue_path+"/dist/static/", flask_path+'/static/')
    del_static('./server/static')
    copy_static('./dist/static','./server')

    print('autodeploy done.')
