import * as stdlib_dists from "@stdlib/stats-base-dists";
import { Data } from "../interfaces/interfaces";

const continuousDists: {
  [key: string]: {
    pdf: (x: number, ...params: number[]) => number;
    cdf: (x: number, ...params: number[]) => number;
    bounds: (params: number[]) => [number, number];
  };
} = {
  arcsine: {
    pdf: stdlib_dists.arcsine.pdf,
    cdf: stdlib_dists.arcsine.cdf,
    bounds: () => [0, 1],
  },
  beta: {
    pdf: stdlib_dists.beta.pdf,
    cdf: stdlib_dists.beta.cdf,
    bounds: () => [0, 1],
  },
  betaprime: {
    pdf: stdlib_dists.betaprime.pdf,
    cdf: stdlib_dists.betaprime.cdf,
    bounds: (params) => [
      0,
      stdlib_dists.betaprime.quantile(0.95, ...(params as [number, number])),
    ],
  },
  cauchy: {
    pdf: stdlib_dists.cauchy.pdf,
    cdf: stdlib_dists.cauchy.cdf,
    bounds: (params) => [
      stdlib_dists.cauchy.quantile(0.05, ...(params as [number, number])),
      stdlib_dists.cauchy.quantile(0.95, ...(params as [number, number])),
    ],
  },
  chi: {
    pdf: stdlib_dists.chi.pdf,
    cdf: stdlib_dists.chi.cdf,
    bounds: (params) => [
      0,
      stdlib_dists.chi.quantile(0.95, ...(params as [number])),
    ],
  },
  chisquare: {
    pdf: stdlib_dists.chisquare.pdf,
    cdf: stdlib_dists.chisquare.cdf,
    bounds: (params) => [
      0,
      stdlib_dists.chisquare.quantile(0.95, ...(params as [number])),
    ],
  },
  cosine: {
    pdf: stdlib_dists.cosine.pdf,
    cdf: stdlib_dists.cosine.cdf,
    bounds: (params) => [params[0] - params[1], params[0] + params[1]],
  },
  erlang: {
    pdf: stdlib_dists.erlang.pdf,
    cdf: stdlib_dists.erlang.cdf,
    bounds: (params) => [
      0,
      stdlib_dists.erlang.quantile(0.95, ...(params as [number, number])),
    ],
  },
  exponential: {
    pdf: stdlib_dists.exponential.pdf,
    cdf: stdlib_dists.exponential.cdf,
    bounds: (params) => [
      0,
      stdlib_dists.exponential.quantile(0.95, ...(params as [number])),
    ],
  },
  f: {
    pdf: stdlib_dists.f.pdf,
    cdf: stdlib_dists.f.cdf,
    bounds: (params) => [
      0,
      stdlib_dists.f.quantile(0.95, ...(params as [number, number])),
    ],
  },
  frechet: {
    pdf: stdlib_dists.frechet.pdf,
    cdf: stdlib_dists.frechet.cdf,
    bounds: (params) => [
      params[3],
      stdlib_dists.frechet.quantile(
        0.95,
        ...(params as [number, number, number])
      ),
    ],
  },
  gamma: {
    pdf: stdlib_dists.gamma.pdf,
    cdf: stdlib_dists.gamma.cdf,
    bounds: (params) => [
      0,
      stdlib_dists.gamma.quantile(0.95, ...(params as [number, number])),
    ],
  },
  gumbel: {
    pdf: stdlib_dists.gumbel.pdf,
    cdf: stdlib_dists.gumbel.cdf,
    bounds: (params) => [
      stdlib_dists.gumbel.quantile(0.05, ...(params as [number, number])),
      stdlib_dists.gumbel.quantile(0.95, ...(params as [number, number])),
    ],
  },
  invgamma: {
    pdf: stdlib_dists.invgamma.pdf,
    cdf: stdlib_dists.invgamma.cdf,
    bounds: (params) => [
      0,
      stdlib_dists.invgamma.quantile(0.95, ...(params as [number, number])),
    ],
  },
  kumaraswamy: {
    pdf: stdlib_dists.kumaraswamy.pdf,
    cdf: stdlib_dists.kumaraswamy.cdf,
    bounds: () => [0, 1],
  },
  laplace: {
    pdf: stdlib_dists.laplace.pdf,
    cdf: stdlib_dists.laplace.cdf,
    bounds: (params) => [
      stdlib_dists.laplace.quantile(0.05, ...(params as [number, number])),
      stdlib_dists.laplace.quantile(0.95, ...(params as [number, number])),
    ],
  },
  levy: {
    pdf: stdlib_dists.levy.pdf,
    cdf: stdlib_dists.levy.cdf,
    bounds: (params) => [
      params[0],
      stdlib_dists.levy.quantile(0.95, ...(params as [number, number])),
    ],
  },
  logistic: {
    pdf: stdlib_dists.logistic.pdf,
    cdf: stdlib_dists.logistic.cdf,
    bounds: (params) => [
      stdlib_dists.logistic.quantile(0.05, ...(params as [number, number])),
      stdlib_dists.logistic.quantile(0.95, ...(params as [number, number])),
    ],
  },
  lognormal: {
    pdf: stdlib_dists.lognormal.pdf,
    cdf: stdlib_dists.lognormal.cdf,
    bounds: (params) => [
      0,
      stdlib_dists.lognormal.quantile(0.95, ...(params as [number, number])),
    ],
  },
  normal: {
    pdf: stdlib_dists.normal.pdf,
    cdf: stdlib_dists.normal.cdf,
    bounds: (params) => [
      stdlib_dists.normal.quantile(0.001, ...(params as [number, number])),
      stdlib_dists.normal.quantile(0.999, ...(params as [number, number])),
    ],
  },
  pareto: {
    pdf: stdlib_dists.pareto1.pdf,
    cdf: stdlib_dists.pareto1.cdf,
    bounds: (params) => [
      params[0],
      stdlib_dists.pareto1.quantile(0.95, ...(params as [number, number])),
    ],
  },
  rayleigh: {
    pdf: stdlib_dists.rayleigh.pdf,
    cdf: stdlib_dists.rayleigh.cdf,
    bounds: (params) => [
      0,
      stdlib_dists.rayleigh.quantile(0.95, ...(params as [number])),
    ],
  },
  t: {
    pdf: stdlib_dists.t.pdf,
    cdf: stdlib_dists.t.cdf,
    bounds: (params) => [
      stdlib_dists.t.quantile(0.05, ...(params as [number])),
      stdlib_dists.t.quantile(0.95, ...(params as [number])),
    ],
  },
  triangular: {
    pdf: stdlib_dists.triangular.pdf,
    cdf: stdlib_dists.triangular.cdf,
    bounds: (params) => [params[0], params[1]],
  },
  uniform: {
    pdf: stdlib_dists.uniform.pdf,
    cdf: stdlib_dists.uniform.cdf,
    bounds: (params) => [params[0], params[1]],
  },
};

const discreteDists: {
  [key: string]: {
    pmf: (x: number, ...params: number[]) => number;
    cdf: (x: number, ...params: number[]) => number;
    bounds: (params: number[]) => number[];
  };
} = {
  bernoulli: {
    pmf: stdlib_dists.bernoulli.pmf,
    cdf: stdlib_dists.bernoulli.cdf,
    bounds: () => [0, 1],
  },
  binomial: {
    pmf: stdlib_dists.binomial.pmf,
    cdf: stdlib_dists.binomial.cdf,
    bounds: (params) => createArrayFromAtoB(0, params[0]),
  },
  discrete_uniform: {
    pmf: stdlib_dists.discreteUniform.pmf,
    cdf: stdlib_dists.discreteUniform.cdf,
    bounds: (params) => createArrayFromAtoB(params[0], params[1]),
  },
  geometric: {
    pmf: stdlib_dists.geometric.pmf,
    cdf: stdlib_dists.geometric.cdf,
    bounds: (params) =>
      createArrayFromAtoB(0, stdlib_dists.geometric.quantile(0.95, params[0])),
  },
  hypergeometric: {
    pmf: stdlib_dists.hypergeometric.pmf,
    cdf: stdlib_dists.hypergeometric.cdf,
    bounds: (params) =>
      createArrayFromAtoB(
        stdlib_dists.hypergeometric.quantile(
          0.05,
          ...(params as [number, number, number])
        ),
        stdlib_dists.hypergeometric.quantile(
          0.95,
          ...(params as [number, number, number])
        )
      ),
  },
  negative_binomial: {
    pmf: stdlib_dists.negativeBinomial.pmf,
    cdf: stdlib_dists.negativeBinomial.cdf,
    bounds: (params) =>
      createArrayFromAtoB(
        0,
        stdlib_dists.negativeBinomial.quantile(
          0.95,
          ...(params as [number, number])
        )
      ),
  },
  poisson: {
    pmf: stdlib_dists.poisson.pmf,
    cdf: stdlib_dists.poisson.cdf,
    bounds: (params) =>
      createArrayFromAtoB(0, stdlib_dists.poisson.quantile(0.95, params[0])),
  },
};

function calculateContinuousDistData(
  distFunc: (x: number, ...params: number[]) => number,
  params: number[],
  bounds: number[]
): Data {
  const y: number[] = [];
  const x: number[] = [];
  for (let i = bounds[0]; i <= bounds[1]; i += (bounds[1] - bounds[0]) / 1000) {
    y.push(Number(distFunc(i, ...params).toFixed(8)));
    x.push(Number(i.toFixed(2)));
  }
  return {x: x, y: y};
}

function calculateDiscreteDistData(
  distFunc: (x: number, ...params: number[]) => number,
  params: number[],
  bounds: number[]
): Data {
  const y: number[] = [];
  const x: number[] = [];
  bounds.forEach((i) => {
    y.push(distFunc(i, ...params));
    x.push(i);
  });
  return {x: x, y: y};
}
  
function createArrayFromAtoB(a: number, b: number): number[] {
  return Array.from({ length: b - a + 1 }, (_, i) => a + i);
}

export function getDistributionData(
  distName: string,
  distType: string,
  params: number[],
  distFunc: string
): Data {
  switch (distType) {

    case "continuous": {
      const continuousFuncTable: {
        [key: string]: (x: number, ...params: number[]) => number;
      } = {
        pdf_pmf: continuousDists[distName].pdf,
        cdf: continuousDists[distName].cdf,
      };
      const func = continuousFuncTable[distFunc];

      return calculateContinuousDistData(
        func,
        params,
        continuousDists[distName].bounds(params)
      );
    }

    case "discrete": {
      const discreteFuncTable: {
        [key: string]: (x: number, ...params: number[]) => number;
      } = {
        pdf_pmf: discreteDists[distName].pmf,
        cdf: discreteDists[distName].cdf,
      };
      const func = discreteFuncTable[distFunc];

      return calculateDiscreteDistData(
        func,
        params,
        discreteDists[distName].bounds(params)
      );
    }
  }
  return {x: [], y: []};
}
