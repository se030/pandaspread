from flask import Flask, request
from flask_cors import CORS
from flask_restx import Api, Resource

app = Flask(__name__)
CORS(app)

api = Api(app)

@api.route('/test')
class Index(Resource):
    def get(self):
        return { 'status': 'Server running ...' }

if __name__ == '__main__':
    app.run(debug=True)
