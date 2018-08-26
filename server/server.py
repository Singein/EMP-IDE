from flask import Flask
from flask import render_template
from flask_script import Manager
from flask import url_for

app = Flask(__name__)
manager = Manager(app)

@app.route('/')
def ide():
    return render_template('index.html')

@app.route('/ide/get_script/<filename>')
def get_script(filename):
    # return 
    pass





if __name__ =='__main__':
    manager.run()










