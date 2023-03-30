from flask import Flask, request
from flask_cors import CORS
from flask_restx import Api, Resource
from dataframe import api as Dataframe

app = Flask(__name__)
CORS(app)

api = Api(app)

@api.route('/')
class Index(Resource):
    def get(self):
        return { 'status': 'Server running ...' }

api.add_namespace(Dataframe, '/dataframe')

if __name__ == '__main__':
    app.run(debug=True)
