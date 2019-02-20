from flask import Flask, request, jsonify
from flask_cors import CORS
from compare import compare, getavg, movavg
from pymongo import MongoClient

import os.path
import json


app = Flask("Attackathon")
CORS(app)

client = MongoClient()
db = client.attackathon
print("running")

@app.route('/login', methods=['GET', 'POST'])
def attempt_login():
    print(request.data)
    return jsonify("This is the login.")


cost_threshold = 50


@app.route('/compare', methods=['GET', 'POST'])
def attempt_compare():
    reg = json.loads(request.data.decode("utf-8"))
    required = ["data", "email"]
    for r in required:
        if r not in reg:
            return jsonify({"error": "invalid request"})

    data, text = reg["data"], reg["email"]
    obj = db.users.find_one({"name": text})
    if obj is None:
        return jsonify({"error": "I could not find you :("})

    register_avg = obj["data"]

    costs = compare(register_avg, data)

    if "blank" not in costs:
        return jsonify(costs)

    blank, held = costs["blank"], costs["held"]

    total_cost = 0.8 * blank + 0.2 * held
    print("Costs: (%f, %f, %f)" % (blank, held, total_cost))

    if total_cost < cost_threshold:
        n_avg = movavg(register_avg, data)
        db.users.update({"data": n_avg}, {"name": text})


    return jsonify(total_cost < cost_threshold)


@app.route('/register', methods=['GET', 'POST'])
def attempt_register():
    reg = json.loads(request.data.decode("utf-8"))

    required = ["1", "2", "email1", "email2"]
    for r in required:
        if r not in reg:
            return jsonify({"error": "invalid request"})
        

    data1, data2 = reg["1"], reg["2"]
    tw1, tw2 = reg["email1"], reg["email2"]
    avg = getavg(data1, data2)

    if avg is None:
        return jsonify({"error": "invalid request"})

    # Word inputs must match
    if tw1 != tw2:
        return jsonify({"error": "invalid text"})

    db.users.update({"name": tw1}, {"name": tw1, "data": avg}, upsert=True)
    
    return jsonify({ "good": "we're all good here"})


@app.route('/', defaults={'path': 'index.html'}, methods=['GET','POST'])
@app.route('/<path:path>')
def route_path(path):
    fname = 'docs/%s' % path

    # Option two: local file (one of Eric's)    
    if os.path.isfile(fname):
        f = open(fname, "r")
        out = f.read()
        f.close()
        return out

    else:
        # Error
        print(request.data)
        return "That page doesn't exist yet. You should make it."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=443)
