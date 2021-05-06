from flask import Flask, request
from flask_cors import CORS
from mysql import Database
import simplejson as json


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origin": "*"}})
db = Database()

@app.route('/', methods=['GET'])
def check():
    return 'hola perros'

@app.route('/ListarIdEvento', methods=['GET'])
def ListarIdEvento():
    content = request.get_json()
    #print(content)
    response = db.listEvent(content['idEvento'])

    if response == None:
        return "Record not found", 400

    return json.dumps(response,200)


@app.route('/AgregarUsuario', methods=['POST'])
def AgregarUsuario():
    content = request.get_json()
    print(content)
    response = db.registrarEsistencia(content['carnet'],content['nombre'], content['nEvento'], content['idEvento'],content['img'])

    if response == None:
        return "Record not found", 400

    return "ok",200


@app.route('/ListarPorCarnet', methods=['GET'])
def ListarPorCarnet():
    content = request.get_json()
    print(content)
    response = db.listIdCarnet(content['carnet'])

    if response == None:
        return "Record not found", 400

    return json.dumps(response,200)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':

    #print(db.registrarEsistencia(2000,"abc",'congresos','1','akjñklaslkdf'))
    app.run(host='0.0.0.0', port=5000, threaded=True, use_reloader=True)

