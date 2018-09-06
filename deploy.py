import os

django_path = './server/MicroIDE/ide'
django_html_path = './server/MicroIDE/ide/templates/ide/index.html'
django_static_path = './server/MicroIDE/ide/static'
vue_html = './dist/index.html'
vue_static = './dist/static/'

def npm_build():
    os.system('npm run build')

def del_django_static(des_path=django_static_path):
    try:
        os.system('rm -rf ' + des_path)
        print(des_path, 'removed.')
    except:
        pass

def copy_static_to_django(src_path=vue_static, des_path=django_path):
    os.system('cp -rp ' + src_path + ' ' + des_path)
    print('static files copy done')


def copy_html_to_django(src_path=vue_html, des_path=django_html_path):
    os.system('cp -rp ' + src_path + ' ' + des_path)
    print('index.html copy done')

if __name__ == '__main__':
    npm_build()
    del_django_static()
    copy_html_to_django()
    copy_static_to_django()
    print('deploy done.')
