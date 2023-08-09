from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/test/<int:n>")
def test(n):
    result = {
        "ans": n/2
    }
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)