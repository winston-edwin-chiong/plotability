import * as stdlib_dists from "@stdlib/stats-base-dists";
import { Point, Distribution } from "../interfaces/interfaces";

const DECIMAL_PRECISION = 12;

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

/**
 *
 * @param dist The `Distribution` object to get properties for.
 * @returns An object containing the properties of the distribution:
 * - `mean` - The mean of the distribution.
 * - `median` - The median of the distribution.
 * - `std` - The standard deviation of the distribution.
 */
export function getDistributionProperties(dist: Distribution): {
  [property: string]: number;
} {
  const name = dist.name;
  const type = dist.type as "continuous" | "discrete";
  const params = dist.params;
  const properties = {} as { [property: string]: number };

  let mean, median, std: number;
  switch (type) {
    case "continuous": {
      mean = continuousDists[name].mean(...(Object.values(params) as number[]));
      median = continuousDists[name].median(...(Object.values(params) as number[]));
      std = continuousDists[name].std(...(Object.values(params) as number[]));
      break;
    }

    case "discrete": {
      mean = discreteDists[name].mean(...(Object.values(params) as number[]));
      median = discreteDists[name].median(...(Object.values(params) as number[]));
      std = discreteDists[name].std(...(Object.values(params) as number[]));
      break;
    }
  }

  properties.mean = mean;
  properties.median = median;
  properties.std = std;
  return properties;
}

/**
 * An object containing the continuous distributions and their associated functions.
 */
const continuousDists: {
  [distribution: string]: {
    pdf_pmf: (x: number, ...params: number[]) => number;
    cdf: (x: number, ...params: number[]) => number;
    quantile: (p: number, ...params: number[]) => number;
    mean: (...params: number[]) => number;
    median: (...params: number[]) => number;
    std: (...params: number[]) => number;
  };
} = {
  arcsine: {
    pdf_pmf: stdlib_dists.arcsine.pdf,
    cdf: stdlib_dists.arcsine.cdf,
    quantile: stdlib_dists.arcsine.quantile,
    mean: stdlib_dists.arcsine.mean,
    median: stdlib_dists.arcsine.median,
    std: stdlib_dists.arcsine.stdev,
  },
  beta: {
    pdf_pmf: stdlib_dists.beta.pdf,
    cdf: stdlib_dists.beta.cdf,
    quantile: stdlib_dists.beta.quantile,
    mean: stdlib_dists.beta.mean,
    median: stdlib_dists.beta.median,
    std: stdlib_dists.beta.stdev,
  },
  betaprime: {
    pdf_pmf: stdlib_dists.betaprime.pdf,
    cdf: stdlib_dists.betaprime.cdf,
    quantile: stdlib_dists.betaprime.quantile,
    mean: stdlib_dists.betaprime.mean,
    median: () => Number.NaN,
    std: stdlib_dists.betaprime.stdev,
  },
  cauchy: {
    pdf_pmf: stdlib_dists.cauchy.pdf,
    cdf: stdlib_dists.cauchy.cdf,
    quantile: stdlib_dists.cauchy.quantile,
    mean: () => Number.NaN,
    median: stdlib_dists.cauchy.median,
    std: () => Number.NaN,
  },
  chi: {
    pdf_pmf: stdlib_dists.chi.pdf,
    cdf: stdlib_dists.chi.cdf,
    quantile: stdlib_dists.chi.quantile,
    mean: stdlib_dists.chi.mean,
    median: () => Number.NaN,
    std: stdlib_dists.chi.stdev,
  },
  chisquare: {
    pdf_pmf: stdlib_dists.chisquare.pdf,
    cdf: stdlib_dists.chisquare.cdf,
    quantile: stdlib_dists.chisquare.quantile,
    mean: stdlib_dists.chisquare.mean,
    median: stdlib_dists.chisquare.median,
    std: stdlib_dists.chisquare.stdev,
  },
  cosine: {
    pdf_pmf: stdlib_dists.cosine.pdf,
    cdf: stdlib_dists.cosine.cdf,
    quantile: stdlib_dists.cosine.quantile,
    mean: stdlib_dists.cosine.mean,
    median: stdlib_dists.cosine.median,
    std: stdlib_dists.cosine.stdev,
  },
  erlang: {
    pdf_pmf: stdlib_dists.erlang.pdf,
    cdf: stdlib_dists.erlang.cdf,
    quantile: stdlib_dists.erlang.quantile,
    mean: stdlib_dists.erlang.mean,
    median: () => Number.NaN,
    std: stdlib_dists.erlang.stdev,
  },
  exponential: {
    pdf_pmf: stdlib_dists.exponential.pdf,
    cdf: stdlib_dists.exponential.cdf,
    quantile: stdlib_dists.exponential.quantile,
    mean: stdlib_dists.exponential.mean,
    median: stdlib_dists.exponential.median,
    std: stdlib_dists.exponential.stdev,
  },
  f: {
    pdf_pmf: stdlib_dists.f.pdf,
    cdf: stdlib_dists.f.cdf,
    quantile: stdlib_dists.f.quantile,
    mean: stdlib_dists.f.mean,
    median: () => Number.NaN,
    std: stdlib_dists.f.stdev,
  },
  frechet: {
    pdf_pmf: stdlib_dists.frechet.pdf,
    cdf: stdlib_dists.frechet.cdf,
    quantile: stdlib_dists.frechet.quantile,
    mean: stdlib_dists.frechet.mean,
    median: stdlib_dists.frechet.median,
    std: stdlib_dists.frechet.stdev,
  },
  gamma: {
    pdf_pmf: stdlib_dists.gamma.pdf,
    cdf: stdlib_dists.gamma.cdf,
    quantile: stdlib_dists.gamma.quantile,
    mean: stdlib_dists.gamma.mean,
    median: () => Number.NaN,
    std: stdlib_dists.gamma.stdev,
  },
  gumbel: {
    pdf_pmf: stdlib_dists.gumbel.pdf,
    cdf: stdlib_dists.gumbel.cdf,
    quantile: stdlib_dists.gumbel.quantile,
    mean: stdlib_dists.gumbel.mean,
    median: stdlib_dists.gumbel.median,
    std: stdlib_dists.gumbel.stdev,
  },
  invgamma: {
    pdf_pmf: stdlib_dists.invgamma.pdf,
    cdf: stdlib_dists.invgamma.cdf,
    quantile: stdlib_dists.invgamma.quantile,
    mean: stdlib_dists.invgamma.mean,
    median: () => Number.NaN,
    std: stdlib_dists.invgamma.stdev,
  },
  kumaraswamy: {
    pdf_pmf: stdlib_dists.kumaraswamy.pdf,
    cdf: stdlib_dists.kumaraswamy.cdf,
    quantile: stdlib_dists.kumaraswamy.quantile,
    mean: stdlib_dists.kumaraswamy.mean,
    median: stdlib_dists.kumaraswamy.median,
    std: stdlib_dists.kumaraswamy.stdev,
  },
  laplace: {
    pdf_pmf: stdlib_dists.laplace.pdf,
    cdf: stdlib_dists.laplace.cdf,
    quantile: stdlib_dists.laplace.quantile,
    mean: stdlib_dists.laplace.mean,
    median: stdlib_dists.laplace.median,
    std: stdlib_dists.laplace.stdev,
  },
  levy: {
    pdf_pmf: stdlib_dists.levy.pdf,
    cdf: stdlib_dists.levy.cdf,
    quantile: stdlib_dists.levy.quantile,
    mean: stdlib_dists.levy.mean,
    median: stdlib_dists.levy.median,
    std: stdlib_dists.levy.stdev,
  },
  logistic: {
    pdf_pmf: stdlib_dists.logistic.pdf,
    cdf: stdlib_dists.logistic.cdf,
    quantile: stdlib_dists.logistic.quantile,
    mean: stdlib_dists.logistic.mean,
    median: stdlib_dists.logistic.median,
    std: stdlib_dists.logistic.stdev,
  },
  lognormal: {
    pdf_pmf: stdlib_dists.lognormal.pdf,
    cdf: stdlib_dists.lognormal.cdf,
    quantile: stdlib_dists.lognormal.quantile,
    mean: stdlib_dists.lognormal.mean,
    median: stdlib_dists.lognormal.median,
    std: stdlib_dists.lognormal.stdev,
  },
  normal: {
    pdf_pmf: stdlib_dists.normal.pdf,
    cdf: stdlib_dists.normal.cdf,
    quantile: stdlib_dists.normal.quantile,
    mean: stdlib_dists.normal.mean,
    median: stdlib_dists.normal.median,
    std: stdlib_dists.normal.stdev,
  },
  pareto1: {
    pdf_pmf: stdlib_dists.pareto1.pdf,
    cdf: stdlib_dists.pareto1.cdf,
    quantile: stdlib_dists.pareto1.quantile,
    mean: stdlib_dists.pareto1.mean,
    median: stdlib_dists.pareto1.median,
    std: stdlib_dists.pareto1.stdev,
  },
  rayleigh: {
    pdf_pmf: stdlib_dists.rayleigh.pdf,
    cdf: stdlib_dists.rayleigh.cdf,
    quantile: stdlib_dists.rayleigh.quantile,
    mean: stdlib_dists.rayleigh.mean,
    median: stdlib_dists.rayleigh.median,
    std: stdlib_dists.rayleigh.stdev,
  },
  t: {
    pdf_pmf: stdlib_dists.t.pdf,
    cdf: stdlib_dists.t.cdf,
    quantile: stdlib_dists.t.quantile,
    mean: stdlib_dists.t.mean,
    median: stdlib_dists.t.median,
    std: stdlib_dists.t.stdev,
  },
  triangular: {
    pdf_pmf: stdlib_dists.triangular.pdf,
    cdf: stdlib_dists.triangular.cdf,
    quantile: stdlib_dists.triangular.quantile,
    mean: stdlib_dists.triangular.mean,
    median: stdlib_dists.triangular.median,
    std: stdlib_dists.triangular.stdev,
  },
  uniform: {
    pdf_pmf: stdlib_dists.uniform.pdf,
    cdf: stdlib_dists.uniform.cdf,
    quantile: stdlib_dists.uniform.quantile,
    mean: stdlib_dists.uniform.mean,
    median: stdlib_dists.uniform.median,
    std: stdlib_dists.uniform.stdev,
  },
};

/**
 * An object containing the discrete distributions and their associated functions.
 */
const discreteDists: {
  [distribution: string]: {
    pdf_pmf: (x: number, ...params: number[]) => number;
    cdf: (x: number, ...params: number[]) => number;
    quantile: (p: number, ...params: number[]) => number;
    mean: (...params: number[]) => number;
    median: (...params: number[]) => number;
    std: (...params: number[]) => number;
  };
} = {
  bernoulli: {
    pdf_pmf: stdlib_dists.bernoulli.pmf,
    cdf: stdlib_dists.bernoulli.cdf,
    quantile: stdlib_dists.bernoulli.quantile,
    mean: stdlib_dists.bernoulli.mean,
    median: stdlib_dists.bernoulli.median,
    std: stdlib_dists.bernoulli.stdev,
  },
  binomial: {
    pdf_pmf: stdlib_dists.binomial.pmf,
    cdf: stdlib_dists.binomial.cdf,
    quantile: stdlib_dists.binomial.quantile,
    mean: stdlib_dists.binomial.mean,
    median: stdlib_dists.binomial.median,
    std: stdlib_dists.binomial.stdev,
  },
  discrete_uniform: {
    pdf_pmf: stdlib_dists.discreteUniform.pmf,
    cdf: stdlib_dists.discreteUniform.cdf,
    quantile: stdlib_dists.discreteUniform.quantile,
    mean: stdlib_dists.discreteUniform.mean,
    median: stdlib_dists.discreteUniform.median,
    std: stdlib_dists.discreteUniform.stdev,
  },
  geometric: {
    pdf_pmf: stdlib_dists.geometric.pmf,
    cdf: stdlib_dists.geometric.cdf,
    quantile: stdlib_dists.geometric.quantile,
    mean: stdlib_dists.geometric.mean,
    median: stdlib_dists.geometric.median,
    std: stdlib_dists.geometric.stdev,
  },
  hypergeometric: {
    pdf_pmf: stdlib_dists.hypergeometric.pmf,
    cdf: stdlib_dists.hypergeometric.cdf,
    quantile: stdlib_dists.hypergeometric.quantile,
    mean: stdlib_dists.hypergeometric.mean,
    median: () => Number.NaN,
    std: stdlib_dists.hypergeometric.stdev,
  },
  negative_binomial: {
    pdf_pmf: stdlib_dists.negativeBinomial.pmf,
    cdf: stdlib_dists.negativeBinomial.cdf,
    quantile: stdlib_dists.negativeBinomial.quantile,
    mean: stdlib_dists.negativeBinomial.mean,
    median: () => Number.NaN,
    std: stdlib_dists.negativeBinomial.stdev,
  },
  poisson: {
    pdf_pmf: stdlib_dists.poisson.pmf,
    cdf: stdlib_dists.poisson.cdf,
    quantile: stdlib_dists.poisson.quantile,
    mean: stdlib_dists.poisson.mean,
    median: stdlib_dists.poisson.median,
    std: stdlib_dists.poisson.stdev,
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
    const x = Number(i.toFixed(DECIMAL_PRECISION));

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
