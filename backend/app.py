from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<div>This is the start of plot-a-probability!</div>"