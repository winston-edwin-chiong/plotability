import * as stdlib_dists from "@stdlib/stats-base-dists";
import { Point, Distribution } from "../interfaces/interfaces";

const DECIMAL_PRECISION = 12;

/**
 * An object containing the continuous distributions and their associated functions,
 * and a function that calculates appropriate x-value bounds from a distribution's parameters.
 */
const continuousDists: {
  [distribution: string]: {
    pdf_pmf: (x: number, ...params: number[]) => number;
    cdf: (x: number, ...params: number[]) => number;
    quantile: (p: number, ...params: number[]) => number;
  };
} = {
  arcsine: {
    pdf_pmf: stdlib_dists.arcsine.pdf,
    cdf: stdlib_dists.arcsine.cdf,
    quantile: stdlib_dists.arcsine.quantile,
  },
  beta: {
    pdf_pmf: stdlib_dists.beta.pdf,
    cdf: stdlib_dists.beta.cdf,
    quantile: stdlib_dists.beta.quantile,
  },
  betaprime: {
    pdf_pmf: stdlib_dists.betaprime.pdf,
    cdf: stdlib_dists.betaprime.cdf,
    quantile: stdlib_dists.betaprime.quantile,
  },
  cauchy: {
    pdf_pmf: stdlib_dists.cauchy.pdf,
    cdf: stdlib_dists.cauchy.cdf,
    quantile: stdlib_dists.cauchy.quantile,
  },
  chi: {
    pdf_pmf: stdlib_dists.chi.pdf,
    cdf: stdlib_dists.chi.cdf,
    quantile: stdlib_dists.chi.quantile,
  },
  chisquare: {
    pdf_pmf: stdlib_dists.chisquare.pdf,
    cdf: stdlib_dists.chisquare.cdf,
    quantile: stdlib_dists.chisquare.quantile,
  },
  cosine: {
    pdf_pmf: stdlib_dists.cosine.pdf,
    cdf: stdlib_dists.cosine.cdf,
    quantile: stdlib_dists.cosine.quantile,
  },
  erlang: {
    pdf_pmf: stdlib_dists.erlang.pdf,
    cdf: stdlib_dists.erlang.cdf,
    quantile: stdlib_dists.erlang.quantile,
  },
  exponential: {
    pdf_pmf: stdlib_dists.exponential.pdf,
    cdf: stdlib_dists.exponential.cdf,
    quantile: stdlib_dists.exponential.quantile,
  },
  f: {
    pdf_pmf: stdlib_dists.f.pdf,
    cdf: stdlib_dists.f.cdf,
    quantile: stdlib_dists.f.quantile,
  },
  frechet: {
    pdf_pmf: stdlib_dists.frechet.pdf,
    cdf: stdlib_dists.frechet.cdf,
    quantile: stdlib_dists.frechet.quantile,
  },
  gamma: {
    pdf_pmf: stdlib_dists.gamma.pdf,
    cdf: stdlib_dists.gamma.cdf,
    quantile: stdlib_dists.gamma.quantile,
  },
  gumbel: {
    pdf_pmf: stdlib_dists.gumbel.pdf,
    cdf: stdlib_dists.gumbel.cdf,
    quantile: stdlib_dists.gumbel.quantile,
  },
  invgamma: {
    pdf_pmf: stdlib_dists.invgamma.pdf,
    cdf: stdlib_dists.invgamma.cdf,
    quantile: stdlib_dists.invgamma.quantile,
  },
  kumaraswamy: {
    pdf_pmf: stdlib_dists.kumaraswamy.pdf,
    cdf: stdlib_dists.kumaraswamy.cdf,
    quantile: stdlib_dists.kumaraswamy.quantile,
  },
  laplace: {
    pdf_pmf: stdlib_dists.laplace.pdf,
    cdf: stdlib_dists.laplace.cdf,
    quantile: stdlib_dists.laplace.quantile,
  },
  levy: {
    pdf_pmf: stdlib_dists.levy.pdf,
    cdf: stdlib_dists.levy.cdf,
    quantile: stdlib_dists.levy.quantile,
  },
  logistic: {
    pdf_pmf: stdlib_dists.logistic.pdf,
    cdf: stdlib_dists.logistic.cdf,
    quantile: stdlib_dists.logistic.quantile,
  },
  lognormal: {
    pdf_pmf: stdlib_dists.lognormal.pdf,
    cdf: stdlib_dists.lognormal.cdf,
    quantile: stdlib_dists.lognormal.quantile,
  },
  normal: {
    pdf_pmf: stdlib_dists.normal.pdf,
    cdf: stdlib_dists.normal.cdf,
    quantile: stdlib_dists.normal.quantile,
  },
  pareto1: {
    pdf_pmf: stdlib_dists.pareto1.pdf,
    cdf: stdlib_dists.pareto1.cdf,
    quantile: stdlib_dists.pareto1.quantile,
  },
  rayleigh: {
    pdf_pmf: stdlib_dists.rayleigh.pdf,
    cdf: stdlib_dists.rayleigh.cdf,
    quantile: stdlib_dists.rayleigh.quantile,
  },
  t: {
    pdf_pmf: stdlib_dists.t.pdf,
    cdf: stdlib_dists.t.cdf,
    quantile: stdlib_dists.t.quantile,
  },
  triangular: {
    pdf_pmf: stdlib_dists.triangular.pdf,
    cdf: stdlib_dists.triangular.cdf,
    quantile: stdlib_dists.triangular.quantile,
  },
  uniform: {
    pdf_pmf: stdlib_dists.uniform.pdf,
    cdf: stdlib_dists.uniform.cdf,
    quantile: stdlib_dists.uniform.quantile,
  },
};

/**
 * An object containing the discrete distributions and their associated functions,
 * and a function that calculates x-value bounds from a distribution's parameters.
 */
const discreteDists: {
  [distribution: string]: {
    pdf_pmf: (x: number, ...params: number[]) => number;
    cdf: (x: number, ...params: number[]) => number;
    quantile: (p: number, ...params: number[]) => number;
  };
} = {
  bernoulli: {
    pdf_pmf: stdlib_dists.bernoulli.pmf,
    cdf: stdlib_dists.bernoulli.cdf,
    quantile: stdlib_dists.bernoulli.quantile,
  },
  binomial: {
    pdf_pmf: stdlib_dists.binomial.pmf,
    cdf: stdlib_dists.binomial.cdf,
    quantile: stdlib_dists.binomial.quantile,
  },
  discrete_uniform: {
    pdf_pmf: stdlib_dists.discreteUniform.pmf,
    cdf: stdlib_dists.discreteUniform.cdf,
    quantile: stdlib_dists.discreteUniform.quantile,
  },
  geometric: {
    pdf_pmf: stdlib_dists.geometric.pmf,
    cdf: stdlib_dists.geometric.cdf,
    quantile: stdlib_dists.geometric.quantile,
  },
  hypergeometric: {
    pdf_pmf: stdlib_dists.hypergeometric.pmf,
    cdf: stdlib_dists.hypergeometric.cdf,
    quantile: stdlib_dists.hypergeometric.quantile,
  },
  negative_binomial: {
    pdf_pmf: stdlib_dists.negativeBinomial.pmf,
    cdf: stdlib_dists.negativeBinomial.cdf,
    quantile: stdlib_dists.negativeBinomial.quantile,
  },
  poisson: {
    pdf_pmf: stdlib_dists.poisson.pmf,
    cdf: stdlib_dists.poisson.cdf,
    quantile: stdlib_dists.poisson.quantile,
  },
};

/**
 * This function calculates the data for a continuous distribution.
 * @param distFunc The distribution function that will be used to calculate the data.
 * @param params The parameters of the distribution, as an object. Passed to `distFunc`.
 * @param xBounds The bounds of the x-axis, as an array.
 * @param errors An object containing error messages.
 * @returns An array of `Point` objects containing the x- and y-values of the distribution.
 */
function calculateContinuousDistData(
  distFunc: (x: number, ...params: number[]) => number,
  params: { [parameter: string]: number },
  xBounds: number[]
): Point[] {
  const points: Point[] = [];
  const numPoints = 1000;

  if (!isFinite(xBounds[0]) || !isFinite(xBounds[1])) {
    console.warn("X-value bounds contains non-finite values.");
    return [];
  }

  for (
    let i = xBounds[0];
    i <= xBounds[1];
    i += (xBounds[1] - xBounds[0]) / numPoints
  ) {
    //! There is an issue here for distributions with a large range between the plotted x- values,
    //! espcially at the tails of the distributions, the y- values will not change very much (or at all), depending
    //! on the decimal precision of the y- value.
    const y = Number(
      distFunc(i, ...Object.values(params)).toFixed(DECIMAL_PRECISION)
    );
    const x = Number(i.toFixed(12));

    if (!isFinite(y)) {
      console.warn("Skipping point with non-finite y-values.");
      continue;
    }

    points.push({ x: x, y: y });
  }
  return points;
}

/**
 * This function calculates the data for a discrete distribution.
 * @param distFunc The distribution function that will be used to calculate the data.
 * @param params The parameters of the distribution, as an object. Passed to `distFunc`.
 * @param xBounds The discrete x-values to evaluate the distribution at.
 * @returns An array of `Point` objects containing the x- and y-values of the distribution.
 */
function calculateDiscreteDistData(
  distFunc: (x: number, ...params: number[]) => number,
  params: { [parameter: string]: number },
  xBounds: number[]
): Point[] {
  const points: Point[] = [];
  xBounds.forEach((i) => {
    const y = Number(
      distFunc(i, ...Object.values(params)).toFixed(DECIMAL_PRECISION)
    );
    const x = i;
    points.push({ x: x, y: y });
  });
  return points;
}

/**
 * This function creates an array of numbers from `a` to `b`, limited to 1001 (0 to 1000) values.
 * The array always includes the start (`a`) and end (`b`) values.
 * @param a The start of the array.
 * @param b The end of the array.
 * @returns An array of numbers from `a` to `b`, limited to 1001 values.
 */
function createArrayFromAtoB(a: number, b: number): number[] {
  const arr = [];

  if (b - a + 1 < 1001) {
    for (let i = a; i <= b; i++) {
      arr.push(i);
    }
  } else {
    for (let i = a; i <= b; i += (b - a) / 1000) {
      arr.push(Math.floor(i));
    }
  }
  return arr;
}

/**
 *
 * @param params The parameters of the distribution, as an object.
 * @param quantile The quantile values to calculate the x-axis bounds from.
 * @param quantileFunc The quantile function of the distribution.
 * @param type The type of the distribution.
 * @returns
 */
function getXBounds(
  params: { [parameter: string]: number },
  quantile: [number, number],
  quantileFunc: (p: number, ...params: number[]) => number,
  type: "continuous" | "discrete"
): [number, number] | number[] {
  switch (type) {
    case "continuous":
      return [
        quantileFunc(quantile[0], ...Object.values(params)),
        quantileFunc(quantile[1], ...Object.values(params)),
      ];
    case "discrete":
      return createArrayFromAtoB(
        quantileFunc(quantile[0], ...Object.values(params)),
        quantileFunc(quantile[1], ...Object.values(params))
      );

    default:
      return [];
  }
}

/**
 * This function calculates the data for a distribution.
 * @param dist The `Distribution` object.
 * @param distFunc The distribution function that will be used to calculate the data.
 * @returns A array of `Point` objects containing the x- and y-values of the distribution.
 */
export function getDistributionData(
  dist: Distribution,
  distFunc: string,
  quantiles: [number, number]
): Point[] {
  const name = dist.name;
  const type = dist.type;
  const params = dist.params as { [parameter: string]: number };

  switch (type) {
    case "continuous": {
      const func = continuousDists[name][distFunc as "pdf_pmf" | "cdf"];

      return calculateContinuousDistData(
        func,
        params,
        getXBounds(params, quantiles, continuousDists[name].quantile, type)
      );
    }

    case "discrete": {
      const func = discreteDists[name][distFunc as "pdf_pmf" | "cdf"];

      return calculateDiscreteDistData(
        func,
        params,
        getXBounds(params, quantiles, discreteDists[name].quantile, type)
      );
    }
  }
  return [];
}
