import * as stdlib_dists from "@stdlib/stats-base-dists";
import { Point, Distribution } from "../interfaces/interfaces";

/**
 * An object containing the continuous distributions and their associated functions,
 * and a function that calculates x-value bounds from a distribution's parameters.
 */
const continuousDists: {
  [distribution: string]: {
    pdf_pmf: (x: number, ...params: number[]) => number;
    cdf: (x: number, ...params: number[]) => number;
    xBounds: (params: { [parameter: string]: number }) => [number, number];
  };
} = {
  arcsine: {
    pdf_pmf: stdlib_dists.arcsine.pdf,
    cdf: stdlib_dists.arcsine.cdf,
    xBounds: (params) => [
      stdlib_dists.arcsine.quantile(
        0.05,
        ...(Object.values(params) as [number, number])
      ),
      stdlib_dists.arcsine.quantile(
        0.95,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  beta: {
    pdf_pmf: stdlib_dists.beta.pdf,
    cdf: stdlib_dists.beta.cdf,
    xBounds: () => [0, 1],
  },
  betaprime: {
    pdf_pmf: stdlib_dists.betaprime.pdf,
    cdf: stdlib_dists.betaprime.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.betaprime.quantile(
        0.95,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  cauchy: {
    pdf_pmf: stdlib_dists.cauchy.pdf,
    cdf: stdlib_dists.cauchy.cdf,
    xBounds: (params) => [
      stdlib_dists.cauchy.quantile(
        0.05,
        ...(Object.values(params) as [number, number])
      ),
      stdlib_dists.cauchy.quantile(
        0.95,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  chi: {
    pdf_pmf: stdlib_dists.chi.pdf,
    cdf: stdlib_dists.chi.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.chi.quantile(0.95, ...(Object.values(params) as [number])),
    ],
  },
  chisquare: {
    pdf_pmf: stdlib_dists.chisquare.pdf,
    cdf: stdlib_dists.chisquare.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.chisquare.quantile(
        0.95,
        ...(Object.values(params) as [number])
      ),
    ],
  },
  cosine: {
    pdf_pmf: stdlib_dists.cosine.pdf,
    cdf: stdlib_dists.cosine.cdf,
    xBounds: (params) => [
      params["mu"] - params["s"],
      params["mu"] + params["s"],
    ],
  },
  erlang: {
    pdf_pmf: stdlib_dists.erlang.pdf,
    cdf: stdlib_dists.erlang.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.erlang.quantile(
        0.95,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  exponential: {
    pdf_pmf: stdlib_dists.exponential.pdf,
    cdf: stdlib_dists.exponential.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.exponential.quantile(
        0.95,
        ...(Object.values(params) as [number])
      ),
    ],
  },
  f: {
    pdf_pmf: stdlib_dists.f.pdf,
    cdf: stdlib_dists.f.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.f.quantile(
        0.75,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  frechet: {
    pdf_pmf: stdlib_dists.frechet.pdf,
    cdf: stdlib_dists.frechet.cdf,
    xBounds: (params) => [
      params["m"],
      stdlib_dists.frechet.quantile(
        0.95,
        ...(Object.values(params) as [number, number, number])
      ),
    ],
  },
  gamma: {
    pdf_pmf: stdlib_dists.gamma.pdf,
    cdf: stdlib_dists.gamma.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.gamma.quantile(
        0.95,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  gumbel: {
    pdf_pmf: stdlib_dists.gumbel.pdf,
    cdf: stdlib_dists.gumbel.cdf,
    xBounds: (params) => [
      stdlib_dists.gumbel.quantile(
        0.05,
        ...(Object.values(params) as [number, number])
      ),
      stdlib_dists.gumbel.quantile(
        0.95,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  invgamma: {
    pdf_pmf: stdlib_dists.invgamma.pdf,
    cdf: stdlib_dists.invgamma.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.invgamma.quantile(
        0.95,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  kumaraswamy: {
    pdf_pmf: stdlib_dists.kumaraswamy.pdf,
    cdf: stdlib_dists.kumaraswamy.cdf,
    xBounds: () => [0, 1],
  },
  laplace: {
    pdf_pmf: stdlib_dists.laplace.pdf,
    cdf: stdlib_dists.laplace.cdf,
    xBounds: (params) => [
      stdlib_dists.laplace.quantile(
        0.05,
        ...(Object.values(params) as [number, number])
      ),
      stdlib_dists.laplace.quantile(
        0.95,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  levy: {
    pdf_pmf: stdlib_dists.levy.pdf,
    cdf: stdlib_dists.levy.cdf,
    xBounds: (params) => [
      params["mu"],
      stdlib_dists.levy.quantile(
        0.75,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  logistic: {
    pdf_pmf: stdlib_dists.logistic.pdf,
    cdf: stdlib_dists.logistic.cdf,
    xBounds: (params) => [
      stdlib_dists.logistic.quantile(
        0.05,
        ...(Object.values(params) as [number, number])
      ),
      stdlib_dists.logistic.quantile(
        0.95,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  lognormal: {
    pdf_pmf: stdlib_dists.lognormal.pdf,
    cdf: stdlib_dists.lognormal.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.lognormal.quantile(
        0.95,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  normal: {
    pdf_pmf: stdlib_dists.normal.pdf,
    cdf: stdlib_dists.normal.cdf,
    xBounds: (params) => [
      stdlib_dists.normal.quantile(
        0.001,
        ...(Object.values(params) as [number, number])
      ),
      stdlib_dists.normal.quantile(
        0.999,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  pareto1: {
    pdf_pmf: stdlib_dists.pareto1.pdf,
    cdf: stdlib_dists.pareto1.cdf,
    xBounds: (params) => [
      params["alpha"],
      stdlib_dists.pareto1.quantile(
        0.95,
        ...(Object.values(params) as [number, number])
      ),
    ],
  },
  rayleigh: {
    pdf_pmf: stdlib_dists.rayleigh.pdf,
    cdf: stdlib_dists.rayleigh.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.rayleigh.quantile(
        0.95,
        ...(Object.values(params) as [number])
      ),
    ],
  },
  t: {
    pdf_pmf: stdlib_dists.t.pdf,
    cdf: stdlib_dists.t.cdf,
    xBounds: (params) => [
      stdlib_dists.t.quantile(0.05, ...(Object.values(params) as [number])),
      stdlib_dists.t.quantile(0.95, ...(Object.values(params) as [number])),
    ],
  },
  triangular: {
    pdf_pmf: stdlib_dists.triangular.pdf,
    cdf: stdlib_dists.triangular.cdf,
    xBounds: (params) => [params["a"], params["b"]],
  },
  uniform: {
    pdf_pmf: stdlib_dists.uniform.pdf,
    cdf: stdlib_dists.uniform.cdf,
    xBounds: (params) => [params["a"], params["b"]],
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
    xBounds: (params: { [parameter: string]: number }) => number[];
  };
} = {
  bernoulli: {
    pdf_pmf: stdlib_dists.bernoulli.pmf,
    cdf: stdlib_dists.bernoulli.cdf,
    xBounds: () => [0, 1],
  },
  binomial: {
    pdf_pmf: stdlib_dists.binomial.pmf,
    cdf: stdlib_dists.binomial.cdf,
    xBounds: (params) => createArrayFromAtoB(0, params["n"]),
  },
  discrete_uniform: {
    pdf_pmf: stdlib_dists.discreteUniform.pmf,
    cdf: stdlib_dists.discreteUniform.cdf,
    xBounds: (params) => createArrayFromAtoB(params["a"], params["b"]),
  },
  geometric: {
    pdf_pmf: stdlib_dists.geometric.pmf,
    cdf: stdlib_dists.geometric.cdf,
    xBounds: (params) =>
      createArrayFromAtoB(
        0,
        stdlib_dists.geometric.quantile(0.999, params["p"])
      ),
  },
  hypergeometric: {
    pdf_pmf: stdlib_dists.hypergeometric.pmf,
    cdf: stdlib_dists.hypergeometric.cdf,
    xBounds: (params) =>
      createArrayFromAtoB(
        stdlib_dists.hypergeometric.quantile(
          0.05,
          ...(Object.values(params) as [number, number, number])
        ),
        stdlib_dists.hypergeometric.quantile(
          0.95,
          ...(Object.values(params) as [number, number, number])
        )
      ),
  },
  negative_binomial: {
    pdf_pmf: stdlib_dists.negativeBinomial.pmf,
    cdf: stdlib_dists.negativeBinomial.cdf,
    xBounds: (params) =>
      createArrayFromAtoB(
        0,
        stdlib_dists.negativeBinomial.quantile(
          0.999,
          ...(Object.values(params) as [number, number])
        )
      ),
  },
  poisson: {
    pdf_pmf: stdlib_dists.poisson.pmf,
    cdf: stdlib_dists.poisson.cdf,
    xBounds: (params) =>
      createArrayFromAtoB(
        stdlib_dists.poisson.quantile(0.001, params["lambda"]),
        stdlib_dists.poisson.quantile(0.999, params["lambda"])
      ),
  },
};

/**
 * This function calculates the data for a continuous distribution.
 *
 * @param distFunc The distribution function that will be used to calculate the data.
 *
 * @param params The parameters of the distribution, as an object. Passed to `distFunc`.
 *
 * @param xBounds The bounds of the x-axis, as an array.
 *
 * @returns An array of `Point` objects containing the x- and y-values of the distribution.
 */
function calculateContinuousDistData(
  distFunc: (x: number, ...params: number[]) => number,
  params: { [parameter: string]: number },
  xBounds: number[]
): Point[] {
  const points: Point[] = [];
  const numPoints = 1000;
  for (
    let i = xBounds[0] - 1;
    i <= xBounds[1] + 1;
    i += (xBounds[1] - 1 - xBounds[0] + 1) / numPoints
  ) {
    const y = Number(distFunc(i, ...Object.values(params)).toFixed(10)); //! This needs adjusting distributions where the y-value changes marginally in comparison to the x-value
    const x = Number(i.toFixed(8));
    points.push({ x: x, y: y });
  }
  return points;
}

/**
 * This function calculates the data for a discrete distribution.
 *
 * @param distFunc The distribution function that will be used to calculate the data.
 *
 * @param params The parameters of the distribution, as an object. Passed to `distFunc`.
 *
 * @param xBounds The discrete x-values to evaluate the distribution at.
 *
 * @returns An array of `Point` objects containing the x- and y-values of the distribution.
 */
function calculateDiscreteDistData(
  distFunc: (x: number, ...params: number[]) => number,
  params: { [parameter: string]: number },
  xBounds: number[]
): Point[] {
  const points: Point[] = [];
  xBounds.forEach((i) => {
    const y = Number(distFunc(i, ...Object.values(params)).toFixed(4));
    const x = i;
    points.push({ x: x, y: y });
  });
  return points;
}

/**
 * This function creates an array of numbers from `a` to `b`.
 *
 * @param a The start of the array.
 *
 * @param b The end of the array.
 *
 * @returns An array of numbers from `a` to `b`.
 */
function createArrayFromAtoB(a: number, b: number): number[] {
  return Array.from({ length: b - a + 1 }, (_, i) => a + i);
}

/**
 * This function calculates the data for a distribution.
 *
 * @param dist The `Distribution` object.
 *
 * @param distFunc The distribution function that will be used to calculate the data.
 *
 * @returns A array of `Point` objects containing the x- and y-values of the distribution.
 */
export function getDistributionData(
  dist: Distribution,
  distFunc: string
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
        continuousDists[name].xBounds(params)
      );
    }

    case "discrete": {
      const func = discreteDists[name][distFunc as "pdf_pmf" | "cdf"];

      return calculateDiscreteDistData(
        func,
        params,
        discreteDists[name].xBounds(params)
      );
    }
  }
  return [];
}
