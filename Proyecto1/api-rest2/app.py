from flask import Flask, request
from flask_cors import CORS
import simplejson as json
import requests
import os

URL = 'http://192.168.1.38:5001'

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origin": "*"}})

@app.route('/', methods=['GET'])
def check():
    r = requests.get(URL+'/',)
    return json.dumps(r.content), r.status_code

@app.route('/ListarIdEvento', methods=['POST'])
def ListarIdEvento():
    content = request.get_json()
    r = requests.get(URL+'/ListarIdEvento',json=content)
    return json.dumps(r.content), r.status_code


@app.route('/AgregarUsuario', methods=['POST'])
def AgregarUsuario():
    content = request.get_json()
    r = requests.post(URL+'/AgregarUsuario',json=content)
    return json.dumps(r.content), r.status_code


@app.route('/ListarPorCarnet', methods=['POST'])
def ListarPorCarnet():
    content = request.get_json()
    r = requests.get(URL+'/ListarPorCarnet',json=content)
    return json.dumps(r.content), r.status_code



if __name__ == '__main__':
    app.run(host='0.0.0.0')

