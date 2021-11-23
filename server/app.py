import warnings
warnings.filterwarnings('ignore')

import pickle
from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def index():
    type = int(request.args.get('type'))
    amount = float(request.args.get('amount'))
    oldBalanceSource = float(request.args.get('oldBalanceSource'))
    newBalanceSource = float(request.args.get('newBalanceSource'))
    oldBalanceDestination = float(request.args.get('oldBalanceDestination'))
    newBalanceDestination = float(request.args.get('newBalanceDestination'))
    InputData = [[type, amount, oldBalanceSource, newBalanceSource, oldBalanceDestination, newBalanceDestination]]
    filename = 'finalized_model.sav'
    loaded_model = pickle.load(open(filename, 'rb'))
    Output = loaded_model.predict(InputData)
    Output = '{ "isFraud": "' + str(Output[0]) + '" }'

    return Output

