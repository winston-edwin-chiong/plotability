from flask import Flask, jsonify, request
from flask_cors import CORS
import scipy.stats as stats
import json
import numpy as np 

app = Flask(__name__)
CORS(app)

with open("distributions.json", "r") as f:
    data = json.load(f)

CONTINUOUS_DISTRIBUTIONS = data["CONTINUOUS_DISTRIBUTIONS"]
DISCRETE_DISTRIBUTIONS = data["DISCRETE_DISTRIBUTIONS"]
ALL_DISTRIBUTIONS = CONTINUOUS_DISTRIBUTIONS + DISCRETE_DISTRIBUTIONS

@app.route("/api/distributions", methods=["GET"])
def get_supported_distributions():
    distribution_type = request.args.get("type", "all") # default parameter is "all"

    if distribution_type == "all":
        result = ALL_DISTRIBUTIONS
    elif distribution_type == "continuous":
        result = CONTINUOUS_DISTRIBUTIONS
    elif distribution_type == "discrete":
        result = DISCRETE_DISTRIBUTIONS
    else:
        return {"error": "Invalid distribution type"}, 400

    return result

@app.route("/api/distributions/<distribution_name>/data", methods=["GET"])
def get_distribution_data(distribution_name):
    distribution = getattr(stats, distribution_name, None) # check if distribution exists
    
    if distribution:
        if isinstance(distribution, stats.rv_continuous):
            bounds_keys = ["leftXBound", "rightXBound"]
            params = {key: float(value) for key, value in request.args.items() if key not in bounds_keys}
            left_x, right_x = map(float, (request.args[key] for key in bounds_keys))
            x_values = np.linspace(left_x, right_x, 100)
            pdf_values = distribution.pdf(x_values, **params)
            return list(pdf_values)
        
        elif isinstance(distribution, stats.rv_discrete):
            bounds_keys = ["leftXBound", "rightXBound"]
            params = {key: float(value) for key, value in request.args.items() if key not in bounds_keys}
            left_x, right_x = map(float, (request.args[key] for key in bounds_keys))
            x_values = np.arange(left_x, right_x+1)
            pdf_values = distribution.pmf(x_values, **params)
            return list(pdf_values)
        
    
    return {"error": "Distribution not found"}, 400

@app.route("/api/distributions/<distribution_name>/parameters", methods=["GET"])
def get_distribution_parameter(distribution_name):
    distribution = getattr(stats, distribution_name, None)

    if distribution:

        if isinstance(distribution, stats.rv_continuous):
            if distribution.shapes:
                return distribution.shapes.split(", ") + ["loc", "scale"]
            return ["loc", "scale"]
        
        elif isinstance(distribution, stats.rv_discrete):
            if distribution.shapes:
                return distribution.shapes.split(", ") + ["loc"]
            return ["loc"]
    
    return {"error": "Distribution not found"}, 400



if __name__ == "__main__":
    app.run(debug=True)