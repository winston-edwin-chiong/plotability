from flask import Flask, jsonify, request
from flask_cors import CORS
from scipy.stats import rv_continuous, rv_discrete, distributions


app = Flask(__name__)
CORS(app)

@app.route("/api/distributions", methods=["GET"])
def get_supported_distributions():
    distribution_type = request.args.get("type", "all") # default parameter is "all"

    if distribution_type == "all":
        result = ["Normal", "Uniform", "Exponential", "Binomial", "Poisson"]
    elif distribution_type == "continuous":
        result = ["Normal", "Uniform", "Exponential"]
    elif distribution_type == "discrete":
        result = ["Binomial", "Poisson"]
    else:
        return {"error": "Invalid distribution type"}, 400

    return result

@app.route("/api/distributions/<distribution_name>/data", methods=["GET"])
def get_distribution_data(distribution_name):
    pass


if __name__ == "__main__":
    app.run(debug=True)