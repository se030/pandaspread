from flask import request
from flask_restx import Namespace, Resource
import pandas as pd

api = Namespace('dataframe', description='Pandas dataframe related operations')

# global variables and functions
idx = -1
df = dict()
def split_json(df):
    return df.to_json(orient='split')

@api.route('')
@api.route('/<int:id>')
class Dataframe(Resource):

    def post(self):
        global df, split_json
        
        try:
            id = self.nextIdx()
            file = request.files.get('file')
        
            df[id] = pd.read_csv(file)
            
            return {
                'id': id,
                'data': split_json(df[id])
            }
        
        except Exception as e:
            api.abort(500, message=e)

    def put(self, id):
        global df, split_json
        
        try:
            id = self.nextIdx()
            file = request.files.get('file')
        
            df[id] = pd.read_csv(file)
            
            return {
                'id': id,
                'data': split_json(df[id])
            }
        
        except Exception as e:
            api.abort(500, message=e)

    def get(self, id=-1):
        global df, split_json
        
        try:
            if (id in df):
                return {
                    'id': id,
                    'data': split_json(df[id])
                }
            
            if (not df):
                return {
                    'data': None
                }
            
            # debug line
            return {
                'data': list(map(split_json, df.values()))
            }
            
        except Exception as e:
            api.abort(500, message=e)

    def delete(self, id):
        global df
        
        try:
            del df[id]
            return {
                'success': True
            }
        
        except Exception as e:
            api.abort(500, message=e)

    def nextIdx(self):
        global idx
        idx += 1
        return idx
