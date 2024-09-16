import { Distribution } from "../interfaces/interfaces";

/**
 * This fuction validates the distribution parameters and returns a dictionary of errors.
 * @param dist The `Distribution` object to validate.
 * @returns A dictionary of errors where the key is the option name and the value is the error message.
 */
export function validateDistribution(dist: Distribution): {
  [parameter: string]: string;
} {
  const errors: { [parameter: string]: string } = {};

  // Check if distribution is selected.
  if (!dist.name || !dist.type) {
    errors["select"] = "Select a distribution!";
  }

  // Check if any parameter is empty.
  if (Object.values(dist.params).includes("")) {
    for (const [key, value] of Object.entries(dist.params)) {
      if (value === "") {
        errors[key] = "Parameter must have a value!";
      }
    }
    return errors;
  }

  switch (dist.type) {
    case "continuous": {
      return validateContinuousDists[dist.name]?.validate(
        dist.params as { [parameter: string]: number },
        errors
      );
    }
    case "discrete": {
      return validateDiscreteDists[dist.name]?.validate(
        dist.params as { [parameter: string]: number },
        errors
      );
    }

    default:
      return errors;
  }
}

/**
 * This function returns a dictionary of default slider properties for each parameter of the distribution.
 * @param dist The `Distribution` object to get sliders for.
 * @returns A dictionary of slider properties where the key is the parameter name and the value is the slider properties.
 */
export function getSliders(dist: Distribution) {
  switch (dist.type) {
    case "continuous": {
      return validateContinuousDists[dist.name]?.sliders(
        dist.params as { [parameter: string]: number }
      );
    }
    case "discrete": {
      return validateDiscreteDists[dist.name]?.sliders(
        dist.params as { [parameter: string]: number }
      );
    }

    default:
      return {};
  }
}

/**
 * An object containing functions to validate continuous distributions.
 * The `validate` function takes a dictionary of parameters and dictionary of errors and updates the error dictionary.
 * The `sliders` function takes a dictionary of parameters returns a dictionary of default slider properties for each parameter.
 */
const validateContinuousDists: {
  [distribution: string]: {
    validate: (
      params: { [parameter: string]: number },
      errors: { [parameter: string]: string }
    ) => {
      [parameter: string]: string;
    };
    sliders: (params: { [parameter: string]: number }) => {
      [parameter: string]: { min: number; max: number; step: number };
    };
  };
} = {
  arcsine: {
    validate: (params, errors) => {
      if (params["a"] >= params["b"]) {
        errors["a"] = "Parameter a must be less than b!";
        errors["b"] = "Parameter a must be less than b!";
      }
      return errors;
    },
    sliders: () => {
      return {
        a: { min: -10, max: 10, step: 0.1 },
        b: { min: -10, max: 10, step: 0.1 },
      };
    },
  },
  beta: {
    validate: (params, errors) => {
      if (params["alpha"] <= 0) {
        errors["alpha"] = "Alpha must be greater than 0!";
      }
      if (params["beta"] <= 0) {
        errors["beta"] = "Beta must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 0.1 },
        beta: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  betaprime: {
    validate: (params, errors) => {
      if (params["alpha"] <= 0) {
        errors["alpha"] = "Alpha must be greater than 0!";
      }
      if (params["beta"] <= 0) {
        errors["beta"] = "Beta must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 0.1 },
        beta: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  cauchy: {
    validate: (params, errors) => {
      if (params["gamma"] < 0) {
        errors["gamma"] = "Scale parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        x0: { min: -10, max: 10, step: 0.1 },
        gamma: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  chi: {
    validate: (params, errors) => {
      if (params["k"] <= 0) {
        errors["k"] = "Degrees of freedom must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        k: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  chisquare: {
    validate: (params, errors) => {
      if (params["k"] <= 0) {
        errors["k"] = "Degrees of freedom must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        k: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  cosine: {
    validate: (params, errors) => {
      if (params["s"] <= 0) {
        errors["s"] = "Scale parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 0.1 },
        s: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  erlang: {
    validate: (params, errors) => {
      if (params["k"] <= 0 || !Number.isInteger(params["k"])) {
        errors["k"] = "Shape parameter must be a integer greater than zero!";
      }
      if (params["lambda"] <= 0) {
        errors["lambda"] = "Rate parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        k: { min: 1, max: 10, step: 0.1 },
        lambda: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  exponential: {
    validate: (params, errors) => {
      if (params["lambda"] <= 0) {
        errors["lambda"] = "Rate parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        lambda: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  f: {
    validate: (params, errors) => {
      if (params["d1"] <= 0) {
        errors["d1"] = "Degrees of freedom must be greater than 0!";
      }
      if (params["d2"] <= 0) {
        errors["d2"] = "Degrees of freedom must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        d1: { min: 1, max: 10, step: 0.1 },
        d2: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  frechet: {
    validate: (params, errors) => {
      if (params["alpha"] <= 0) {
        errors["alpha"] = "Shape parameter must be greater than 0!";
      }
      if (params["s"] <= 0) {
        errors["s"] = "Scale parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 0.1 },
        s: { min: 1, max: 10, step: 0.1 },
        m: { min: -10, max: 10, step: 0.1 },
      };
    },
  },
  gamma: {
    validate: (params, errors) => {
      if (params["alpha"] <= 0) {
        errors["alpha"] = "Alpha must be greater than 0!";
      }
      if (params["beta"] <= 0) {
        errors["beta"] = "Beta must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 0.1 },
        beta: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  gumbel: {
    validate: (params, errors) => {
      if (params["beta"] <= 0) {
        errors["beta"] = "Scale parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 0.1 },
        beta: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  invgamma: {
    validate: (params, errors) => {
      if (params["alpha"] <= 0) {
        errors["alpha"] = "Alpha must be greater than 0!";
      }
      if (params["beta"] <= 0) {
        errors["beta"] = "Beta must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 0.1 },
        beta: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  kumaraswamy: {
    validate: (params, errors) => {
      if (params["a"] <= 0) {
        errors["a"] = "Shape parameter a must be greater than 0!";
      }
      if (params["b"] <= 0) {
        errors["b"] = "Shape parameter b must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        a: { min: 1, max: 10, step: 0.1 },
        b: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  laplace: {
    validate: (params, errors) => {
      if (params["b"] <= 0) {
        errors["b"] = "Scale parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 0.1 },
        b: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  levy: {
    validate: (params, errors) => {
      if (params["c"] <= 0) {
        errors["c"] = "Scale parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 0.1 },
        c: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  logistic: {
    validate: (params, errors) => {
      if (params["s"] <= 0) {
        errors["s"] = "Scale parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 0.1 },
        s: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  lognormal: {
    validate: (params, errors) => {
      if (params["sigma"] <= 0) {
        errors["sigma"] = "Scale parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 0.1 },
        sigma: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  normal: {
    validate: (params, errors) => {
      if (params["sigma"] <= 0) {
        errors["sigma"] = "Standard deviation must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 0.1 },
        sigma: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  pareto1: {
    validate: (params, errors) => {
      if (params["alpha"] <= 0) {
        errors["alpha"] = "Shape parameter must be greater than 0!";
      }
      if (params["beta"] <= 0) {
        errors["beta"] = "Scale parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 0.1 },
        beta: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  rayleigh: {
    validate: (params, errors) => {
      if (params["sigma"] <= 0) {
        errors["sigma"] = "Scale parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        sigma: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  t: {
    validate: (params, errors) => {
      if (params["v"] <= 0) {
        errors["v"] = "Degrees of freedom must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        v: { min: 1, max: 10, step: 0.1 },
      };
    },
  },
  triangular: {
    validate: (params, errors) => {
      if (
        params["c"] < params["a"] ||
        params["c"] > params["b"] ||
        params["a"] > params["b"]
      ) {
        errors["a"] = "Parameters must satisfy a <= c <= b!";
        errors["b"] = "Parameters must satisfy a <= c <= b!";
        errors["c"] = "Parameters must satisfy a <= c <= b!";
      }
      return errors;
    },
    sliders: () => {
      return {
        a: { min: -10, max: 10, step: 0.1 },
        b: { min: -10, max: 10, step: 0.1 },
        c: { min: -10, max: 1, step: 0.1 },
      };
    },
  },
  uniform: {
    validate: (params, errors) => {
      if (params["a"] >= params["b"]) {
        errors["a"] = "Parameter a must be less than b!";
        errors["b"] = "Parameter a must be less than b!";
      }
      return errors;
    },
    sliders: () => {
      return {
        a: { min: -10, max: 10, step: 0.1 },
        b: { min: -10, max: 10, step: 0.1 },
      };
    },
  },
};

/**
 * An object containing functions to validate discrete distributions.
 * The `validate` function takes a dictionary of parameters and dictionary of errors and updates the error dictionary.
 * The `sliders` function takes a dictionary of parameters returns a dictionary of default slider properties for each parameter.
 */
const validateDiscreteDists: {
  [distribution: string]: {
    validate: (
      params: { [parameter: string]: number },
      errors: { [parameter: string]: string }
    ) => {
      [parameter: string]: string;
    };
    sliders: (params: { [parameter: string]: number }) => {
      [parameter: string]: { min: number; max: number; step: number };
    };
  };
} = {
  bernoulli: {
    validate: (params, errors) => {
      if (params["p"] < 0 || params["p"] > 1) {
        errors["p"] = "Probability must be between 0 and 1!";
      }
      return errors;
    },
    sliders: () => {
      return {
        p: { min: 0, max: 1, step: 0.05 },
      };
    },
  },
  binomial: {
    validate: (params, errors) => {
      if (params["n"] < 0 || !Number.isInteger(params["n"])) {
        errors["n"] = "Number of trials must be a non-negative integer!";
      }
      if (params["p"] < 0 || params["p"] > 1) {
        errors["p"] = "Probability must be between 0 and 1!";
      }
      return errors;
    },
    sliders: () => {
      return {
        n: { min: 0, max: 25, step: 1 },
        p: { min: 0, max: 1, step: 0.05 },
      };
    },
  },
  discrete_uniform: {
    validate: (params, errors) => {
      if (params["a"] >= params["b"]) {
        errors["a"] = "Parameter a must be less than b!";
        errors["b"] = "Parameter a must be less than b!";
      }
      if (!Number.isInteger(params["a"]) || !Number.isInteger(params["b"])) {
        errors["a"] = "Parameter a must be an integer!";
        errors["b"] = "Parameter b must be an integer!";
      }
      return errors;
    },
    sliders: () => {
      return {
        a: { min: -10, max: 10, step: 1 },
        b: { min: -10, max: 10, step: 1 },
      };
    },
  },
  geometric: {
    validate: (params, errors) => {
      if (params["p"] <= 0 || params["p"] > 1) {
        errors["p"] =
          "Probability must be greater 0 and less than or equal to 1!";
      }
      return errors;
    },
    sliders: () => {
      return {
        p: { min: 0, max: 1, step: 0.05 },
      };
    },
  },
  hypergeometric: {
    validate: (params, errors) => {
      if (params["N"] < 0 || !Number.isInteger(params["N"])) {
        errors["N"] = "Population size must be a non-negative integer!";
      }
      if (
        params["K"] < 0 ||
        !Number.isInteger(params["K"]) ||
        params["K"] > params["N"]
      ) {
        errors["K"] =
          "Number of successes must be a non-negative integer and less than the population size!";
      }
      if (
        params["n"] < 0 ||
        !Number.isInteger(params["n"]) ||
        params["n"] > params["N"]
      ) {
        errors["n"] =
          "Number of draws must be a non-negative integer and less than the population size!!";
      }
      return errors;
    },
    sliders: () => {
      return {
        N: { min: 0, max: 25, step: 1 },
        K: { min: 0, max: 25, step: 1 },
        n: { min: 0, max: 25, step: 1 },
      };
    },
  },
  negative_binomial: {
    validate: (params, errors) => {
      if (params["r"] <= 0 || !Number.isInteger(params["r"])) {
        errors["r"] = "Number of successes must be a positive integer!";
      }
      if (params["p"] <= 0 || params["p"] > 1) {
        errors["p"] =
          "Probability must be greater than 0 and less than or equal to 1!";
      }
      return errors;
    },
    sliders: () => {
      return {
        r: { min: 1, max: 25, step: 1 },
        p: { min: 0.01, max: 1, step: 0.05 },
      };
    },
  },
  poisson: {
    validate: (params, errors) => {
      if (params["lambda"] <= 0) {
        errors["lambda"] = "Rate parameter must be greater than 0!";
      }
      return errors;
    },
    sliders: () => {
      return {
        lambda: { min: 1, max: 25, step: 1 },
      };
    },
  },
};
