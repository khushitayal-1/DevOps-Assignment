from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

count = 0

@app.route("/increment", methods=["POST"])
def increment():
    global count
    count += 1
    return jsonify({"count": count})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
