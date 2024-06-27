import { Distribution } from "../interfaces/interfaces";

export function validateDistribution(dist: Distribution) {
  if (testNull(dist)) {
    return testNull(dist);
  }

  switch (dist.type) {
    case "continuous": {
      return validateContinuousDists[dist.name]?.validate(
        dist.params as { [key: string]: number }
      );
    }
    case "discrete": {
      return validateDiscreteDists[dist.name]?.validate(
        dist.params as { [key: string]: number }
      );
    }
  }
}

export function getSliders(dist: Distribution) {
  switch (dist.type) {
    case "continuous": {
      return validateContinuousDists[dist.name]?.sliders(
        dist.params as { [key: string]: number }
      );
    }
    case "discrete": {
      return validateDiscreteDists[dist.name]?.sliders(
        dist.params as { [key: string]: number }
      );
    }
  }
}

function testNull(dist: Distribution) {
  if (!dist.name || !dist.type) {
    return "Select a distribution!";
  } else if (Object.values(dist.params).includes("")) {
    return "Fill in all parameters!";
  }
  return "";
}

const validateContinuousDists: {
  [key: string]: {
    validate: (params: { [key: string]: number }) => string;
    sliders: (params: { [key: string]: number }) => {
      [key: string]: { min: number; max: number; step: number };
    };
  };
} = {
  arcsine: {
    validate: (params) => {
      if (params["a"] >= params["b"]) {
        return "Parameter a must be less than b!";
      }
      return "";
    },
    sliders: () => {
      return {
        a: { min: -10, max: 10, step: 1 },
        b: { min: -10, max: 10, step: 1 },
      };
    },
  },
  beta: {
    validate: (params) => {
      if (params["alpha"] <= 0) {
        return "Alpha must be greater than 0!";
      }
      if (params["beta"] <= 0) {
        return "Beta must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 1 },
        beta: { min: 1, max: 10, step: 1 },
      };
    },
  },
  betaprime: {
    validate: (params) => {
      if (params["alpha"] <= 0) {
        return "Alpha must be greater than 0!";
      }
      if (params["beta"] <= 0) {
        return "Beta must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 1 },
        beta: { min: 1, max: 10, step: 1 },
      };
    },
  },
  cauchy: {
    validate: (params) => {
      if (params["gamma"] < 0) {
        return "Scale parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        x0: { min: -10, max: 10, step: 1 },
        gamma: { min: 1, max: 10, step: 1 },
      };
    },
  },
  chi: {
    validate: (params) => {
      if (params["k"] <= 0) {
        return "Degrees of freedom must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        k: { min: 1, max: 10, step: 1 },
      };
    },
  },
  chisquare: {
    validate: (params) => {
      if (params["k"] <= 0) {
        return "Degrees of freedom must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        k: { min: 1, max: 10, step: 1 },
      };
    },
  },
  cosine: {
    validate: (params) => {
      if (params["s"] <= 0) {
        return "Scale parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 1 },
        s: { min: 1, max: 10, step: 1 },
      };
    },
  },
  erlang: {
    validate: (params) => {
      if (params["k"] <= 0 || !Number.isInteger(params["k"])) {
        return "Shape parameter must be a integer greater than zero!";
      }
      if (params["lambda"] <= 0) {
        return "Rate parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        k: { min: 1, max: 10, step: 1 },
        lambda: { min: 1, max: 10, step: 1 },
      };
    },
  },
  exponential: {
    validate: (params) => {
      if (params["lambda"] <= 0) {
        return "Rate parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        lambda: { min: 1, max: 10, step: 1 },
      };
    },
  },
  f: {
    validate: (params) => {
      if (params["d1"] <= 0) {
        return "Degrees of freedom must be greater than 0!";
      }
      if (params["d2"] <= 0) {
        return "Degrees of freedom must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        d1: { min: 1, max: 10, step: 1 },
        d2: { min: 1, max: 10, step: 1 },
      };
    },
  },
  frechet: {
    validate: (params) => {
      if (params["alpha"] <= 0) {
        return "Shape parameter must be greater than 0!";
      }
      if (params["s"] <= 0) {
        return "Scale parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 1 },
        s: { min: 1, max: 10, step: 1 },
        m: { min: -10, max: 10, step: 1 },
      };
    },
  },
  gamma: {
    validate: (params) => {
      if (params["alpha"] <= 0) {
        return "Alpha must be greater than 0!";
      }
      if (params["beta"] <= 0) {
        return "Beta must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 1 },
        beta: { min: 1, max: 10, step: 1 },
      };
    },
  },
  gumbel: {
    validate: (params) => {
      if (params["beta"] <= 0) {
        return "Scale parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 1 },
        beta: { min: 1, max: 10, step: 1 },
      };
    },
  },
  invgamma: {
    validate: (params) => {
      if (params["alpha"] <= 0) {
        return "Alpha must be greater than 0!";
      }
      if (params["beta"] <= 0) {
        return "Beta must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 1 },
        beta: { min: 1, max: 10, step: 1 },
      };
    },
  },
  kumaraswamy: {
    validate: (params) => {
      if (params["a"] <= 0) {
        return "Shape parameter a must be greater than 0!";
      }
      if (params["b"] <= 0) {
        return "Shape parameter b must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        a: { min: 1, max: 10, step: 1 },
        b: { min: 1, max: 10, step: 1 },
      };
    },
  },
  laplace: {
    validate: (params) => {
      if (params["b"] <= 0) {
        return "Scale parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 1 },
        b: { min: 1, max: 10, step: 1 },
      };
    },
  },
  levy: {
    validate: (params) => {
      if (params["c"] <= 0) {
        return "Scale parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 1 },
        c: { min: 1, max: 10, step: 1 },
      };
    },
  },
  logistic: {
    validate: (params) => {
      if (params["s"] <= 0) {
        return "Scale parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 1 },
        s: { min: 1, max: 10, step: 1 },
      };
    },
  },
  lognormal: {
    validate: (params) => {
      if (params["sigma"] <= 0) {
        return "Scale parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 1 },
        sigma: { min: 1, max: 10, step: 1 },
      };
    },
  },
  normal: {
    validate: (params) => {
      if (params["sigma"] <= 0) {
        return "Standard deviation must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        mu: { min: -10, max: 10, step: 1 },
        sigma: { min: 1, max: 10, step: 1 },
      };
    },
  },
  pareto1: {
    validate: (params) => {
      if (params["alpha"] <= 0) {
        return "Shape parameter must be greater than 0!";
      }
      if (params["beta"] <= 0) {
        return "Scale parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        alpha: { min: 1, max: 10, step: 1 },
        beta: { min: 1, max: 10, step: 1 },
      };
    },
  },
  rayleigh: {
    validate: (params) => {
      if (params["sigma"] <= 0) {
        return "Scale parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        sigma: { min: 1, max: 10, step: 1 },
      };
    },
  },
  t: {
    validate: (params) => {
      if (params["v"] <= 0) {
        return "Degrees of freedom must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        nu: { min: 1, max: 10, step: 1 },
      };
    },
  },
  triangular: {
    validate: (params) => {
      if (params["c"] < params["a"] || params["c"] > params["b"]) {
        return "Parameter c must be between a and b!";
      }
      return "";
    },
    sliders: () => {
      return {
        a: { min: -10, max: 10, step: 1 },
        b: { min: -10, max: 10, step: 1 },
        c: { min: -10, max: 1, step: 0.1 }, //TODO: Might be help to clamp c between a and b.
      };
    },
  },
  uniform: {
    validate: (params) => {
      if (params["a"] >= params["b"]) {
        return "Parameter a must be less than b!";
      }
      return "";
    },
    sliders: () => {
      return {
        a: { min: -10, max: 10, step: 1 },
        b: { min: -10, max: 10, step: 1 },
      };
    },
  },
};

const validateDiscreteDists: {
  [key: string]: {
    validate: (params: { [key: string]: number }) => string;
    sliders: (params: { [key: string]: number }) => {
      [key: string]: { min: number; max: number; step: number };
    };
  };
} = {
  bernoulli: {
    validate: (params) => {
      if (params["p"] < 0 || params["p"] > 1) {
        return "Probability must be between 0 and 1!";
      }
      return "";
    },
    sliders: () => {
      return {
        p: { min: 0, max: 1, step: 0.05 },
      };
    },
  },
  binomial: {
    validate: (params) => {
      if (params["n"] < 0 || !Number.isInteger(params["n"])) {
        return "Number of trials must be a non-negative integer!";
      }
      if (params["p"] < 0 || params["p"] > 1) {
        return "Probability must be between 0 and 1!";
      }
      return "";
    },
    sliders: () => {
      return {
        n: { min: 0, max: 10, step: 1 },
        p: { min: 0, max: 1, step: 0.05 },
      };
    },
  },
  discrete_uniform: {
    validate: (params) => {
      if (params["a"] >= params["b"]) {
        return "Parameter a must be less than b!";
      }
      return "";
    },
    sliders: () => {
      return {
        a: { min: -10, max: 10, step: 1 },
        b: { min: -10, max: 10, step: 1 },
      };
    },
  },
  geometric: {
    validate: (params) => {
      if (params["p"] < 0 || params["p"] > 1) {
        return "Probability must be between 0 and 1!";
      }
      return "";
    },
    sliders: () => {
      return {
        p: { min: 0, max: 1, step: 0.05 },
      };
    },
  },
  hypergeometric: {
    validate: (params) => {
      if (params["N"] < 0 || !Number.isInteger(params["N"])) {
        return "Population size must be a non-negative integer!";
      }
      if (params["K"] < 0 || !Number.isInteger(params["K"])) {
        return "Number of successes must be a non-negative integer!";
      }
      if (params["n"] < 0 || !Number.isInteger(params["n"])) {
        return "Number of draws must be a non-negative integer!";
      }
      if (params["K"] > params["N"]) {
        return "Number of successes must be less than the population size!";
      }
      if (params["n"] > params["N"]) {
        return "Number of draws must be less than the population size!";
      }
      return "";
    },
    sliders: () => {
      return {
        N: { min: 0, max: 10, step: 1 },
        K: { min: 0, max: 10, step: 1 },
        n: { min: 0, max: 10, step: 1 },
      };
    },
  },
  negative_binomial: {
    validate: (params) => {
      if (params["r"] <= 0 || !Number.isInteger(params["r"])) {
        return "Number of successes must be a positive integer!";
      }
      if (params["p"] <= 0 || params["p"] > 1) {
        return "Probability must be greater than 0 and less than or equal to 1!";
      }
      return "";
    },
    sliders: () => {
      return {
        r: { min: 1, max: 10, step: 1 },
        p: { min: 0.01, max: 1, step: 0.05 },
      };
    },
  },
  poisson: {
    validate: (params) => {
      if (params["lambda"] <= 0) {
        return "Rate parameter must be greater than 0!";
      }
      return "";
    },
    sliders: () => {
      return {
        lambda: { min: 1, max: 10, step: 1 },
      };
    },
  },
};
