"""
用于将microide.py的脚本 注入到 src/pages/ide/microide.py.js
"""

src_path = './microide.py'
des_path = '../src/pages/ide/microide.py.js'
codes = ''
js_codes = """var microide_codes=`%s`;\nexport {\n  microide_codes\n}"""
with open(src_path, 'r') as f:
    codes = f.read()

with open(des_path, 'w') as f:
    f.write(js_codes % codes)
