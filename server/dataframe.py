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

@api.route('/<int:id>/na')
class Nullish(Resource):

    def get(self, id=-1):
        global df, split_json
        
        try:
            if (id in df):
                total_rows = df[id].shape[0]
                count_per_column = df[id].count().to_list()
                
                return {
                    'id': id,
                    'data': list(map(lambda x: total_rows - x, count_per_column))
                }
            
            else:
                return {
                    'data': None
                }
            
        except Exception as e:
            api.abort(500, message=e)

    def delete(self, id):
        global df

        column = request.args.get('column')

        try:
            if column:
                df[id].dropna(subset=[column], inplace=True)
            else:
                df[id].dropna(inplace=True)
            
            return {
                'id': id,
                'data': split_json(df[id])
            }
        
        except Exception as e:
            api.abort(500, message=e)

@api.route('/<int:id>/describe')
class Describe(Resource):

    def get(self, id=-1):
        global df, split_json
        
        try:
            if (id in df):
                total_rows = df[id].shape[0]
                                
                def describe(col):
                    desc = df[id][col].describe()
                    
                    if 'unique' in desc:
                        return {
                            'type': 'categorical',
                            'count': str(int(desc['count'])),
                            'unique': str(desc['unique']),
                            'top': str(desc['top']),
                            'freq': str(desc['freq'])
                        }
                    else:
                        return {
                            'type': 'numerical',
                            'count': str(int(desc['count'])),
                            'mean': str(desc['mean']),
                            'std': str(desc['std']),
                            'min': str(desc['min']),
                            'max': str(desc['max']),
                            'data': df[id][col].to_list()[:10000] if desc['count'] == total_rows else []
                        }
                
                return {
                    'id': id,
                    'data': list(map(describe, df[id]))
                }
            
            else:
                return {
                    'data': None
                }
            
        except Exception as e:
            api.abort(500, message=e)