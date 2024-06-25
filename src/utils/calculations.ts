import * as stdlib_dists from "@stdlib/stats-base-dists";
import { Data, Distribution } from "../interfaces/interfaces";

const continuousDists: {
  [key: string]: {
    pdf: (x: number, ...params: number[]) => number;
    cdf: (x: number, ...params: number[]) => number;
    xBounds: (params: { [key: string]: number }) => [number, number];
  };
} = {
  arcsine: {
    pdf: stdlib_dists.arcsine.pdf,
    cdf: stdlib_dists.arcsine.cdf,
    xBounds: () => [0, 1],
  },
  beta: {
    pdf: stdlib_dists.beta.pdf,
    cdf: stdlib_dists.beta.cdf,
    xBounds: () => [0, 1],
  },
  betaprime: {
    pdf: stdlib_dists.betaprime.pdf,
    cdf: stdlib_dists.betaprime.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.betaprime.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  cauchy: {
    pdf: stdlib_dists.cauchy.pdf,
    cdf: stdlib_dists.cauchy.cdf,
    xBounds: (params) => [
      stdlib_dists.cauchy.quantile(0.05, ...(Object.values(params) as [number, number])),
      stdlib_dists.cauchy.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  chi: {
    pdf: stdlib_dists.chi.pdf,
    cdf: stdlib_dists.chi.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.chi.quantile(0.95, ...(Object.values(params) as [number])),
    ],
  },
  chisquare: {
    pdf: stdlib_dists.chisquare.pdf,
    cdf: stdlib_dists.chisquare.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.chisquare.quantile(0.95, ...(Object.values(params) as [number])),
    ],
  },
  cosine: {
    pdf: stdlib_dists.cosine.pdf,
    cdf: stdlib_dists.cosine.cdf,
    xBounds: (params) => [params["mu"] - params["s"], params["mu"] + params["s"]],
  },
  erlang: {
    pdf: stdlib_dists.erlang.pdf,
    cdf: stdlib_dists.erlang.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.erlang.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  exponential: {
    pdf: stdlib_dists.exponential.pdf,
    cdf: stdlib_dists.exponential.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.exponential.quantile(0.95, ...(Object.values(params) as [number])),
    ],
  },
  f: {
    pdf: stdlib_dists.f.pdf,
    cdf: stdlib_dists.f.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.f.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  frechet: {
    pdf: stdlib_dists.frechet.pdf,
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
    pdf: stdlib_dists.gamma.pdf,
    cdf: stdlib_dists.gamma.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.gamma.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  gumbel: {
    pdf: stdlib_dists.gumbel.pdf,
    cdf: stdlib_dists.gumbel.cdf,
    xBounds: (params) => [
      stdlib_dists.gumbel.quantile(0.05, ...(Object.values(params) as [number, number])),
      stdlib_dists.gumbel.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  invgamma: {
    pdf: stdlib_dists.invgamma.pdf,
    cdf: stdlib_dists.invgamma.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.invgamma.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  kumaraswamy: {
    pdf: stdlib_dists.kumaraswamy.pdf,
    cdf: stdlib_dists.kumaraswamy.cdf,
    xBounds: () => [0, 1],
  },
  laplace: {
    pdf: stdlib_dists.laplace.pdf,
    cdf: stdlib_dists.laplace.cdf,
    xBounds: (params) => [
      stdlib_dists.laplace.quantile(0.05, ...(Object.values(params) as [number, number])),
      stdlib_dists.laplace.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  levy: {
    pdf: stdlib_dists.levy.pdf,
    cdf: stdlib_dists.levy.cdf,
    xBounds: (params) => [
      params["mu"],
      stdlib_dists.levy.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  logistic: {
    pdf: stdlib_dists.logistic.pdf,
    cdf: stdlib_dists.logistic.cdf,
    xBounds: (params) => [
      stdlib_dists.logistic.quantile(0.05, ...(Object.values(params) as [number, number])),
      stdlib_dists.logistic.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  lognormal: {
    pdf: stdlib_dists.lognormal.pdf,
    cdf: stdlib_dists.lognormal.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.lognormal.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  normal: {
    pdf: stdlib_dists.normal.pdf,
    cdf: stdlib_dists.normal.cdf,
    xBounds: (params) => [
      stdlib_dists.normal.quantile(0.001, ...(Object.values(params) as [number, number])),
      stdlib_dists.normal.quantile(0.999, ...(Object.values(params) as [number, number])),
    ],
  },
  pareto: {
    pdf: stdlib_dists.pareto1.pdf,
    cdf: stdlib_dists.pareto1.cdf,
    xBounds: (params) => [
      params["alpha"],
      stdlib_dists.pareto1.quantile(0.95, ...(Object.values(params) as [number, number])),
    ],
  },
  rayleigh: {
    pdf: stdlib_dists.rayleigh.pdf,
    cdf: stdlib_dists.rayleigh.cdf,
    xBounds: (params) => [
      0,
      stdlib_dists.rayleigh.quantile(0.95, ...(Object.values(params) as [number])),
    ],
  },
  t: {
    pdf: stdlib_dists.t.pdf,
    cdf: stdlib_dists.t.cdf,
    xBounds: (params) => [
      stdlib_dists.t.quantile(0.05, ...(Object.values(params) as [number])),
      stdlib_dists.t.quantile(0.95, ...(Object.values(params) as [number])),
    ],
  },
  triangular: {
    pdf: stdlib_dists.triangular.pdf,
    cdf: stdlib_dists.triangular.cdf,
    xBounds: (params) => [params["a"], params["b"]],
  },
  uniform: {
    pdf: stdlib_dists.uniform.pdf,
    cdf: stdlib_dists.uniform.cdf,
    xBounds: (params) => [params["a"], params["b"]],
  },
};

const discreteDists: {
  [key: string]: {
    pmf: (x: number, ...params: number[]) => number;
    cdf: (x: number, ...params: number[]) => number;
    xBounds: (params: { [key: string]: number }) => number[];
  };
} = {
  bernoulli: {
    pmf: stdlib_dists.bernoulli.pmf,
    cdf: stdlib_dists.bernoulli.cdf,
    xBounds: () => [0, 1],
  },
  binomial: {
    pmf: stdlib_dists.binomial.pmf,
    cdf: stdlib_dists.binomial.cdf,
    xBounds: (params) => createArrayFromAtoB(0, params["n"]),
  },
  discrete_uniform: {
    pmf: stdlib_dists.discreteUniform.pmf,
    cdf: stdlib_dists.discreteUniform.cdf,
    xBounds: (params) => createArrayFromAtoB(params["a"], params["b"]),
  },
  geometric: {
    pmf: stdlib_dists.geometric.pmf,
    cdf: stdlib_dists.geometric.cdf,
    xBounds: (params) =>
      createArrayFromAtoB(0, stdlib_dists.geometric.quantile(0.999, params["p"])),
  },
  hypergeometric: {
    pmf: stdlib_dists.hypergeometric.pmf,
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
    pmf: stdlib_dists.negativeBinomial.pmf,
    cdf: stdlib_dists.negativeBinomial.cdf,
    xBounds: (params) =>
      createArrayFromAtoB(
        0,
        stdlib_dists.negativeBinomial.quantile(
          0.95,
          ...(Object.values(params) as [number, number])
        )
      ),
  },
  poisson: {
    pmf: stdlib_dists.poisson.pmf,
    cdf: stdlib_dists.poisson.cdf,
    xBounds: (params) =>
      createArrayFromAtoB(0, stdlib_dists.poisson.quantile(0.95, params["mu"])),
  },
};

function calculateContinuousDistData(
  distFunc: (x: number, ...params: number[]) => number,
  params: { [key: string]: number },
  xBounds: number[]
): Data {
  const y: number[] = [];
  const x: number[] = [];
  const numPoints = 1000;
  for (let i = xBounds[0]-1; i <= xBounds[1]+1; i += (xBounds[1]-1 - xBounds[0]+1) / numPoints) {
    y.push(Number(distFunc(i, ...Object.values(params)).toFixed(8)));
    x.push(Number(i.toFixed(1)));
  }
  return {x: x, y: y};
}

function calculateDiscreteDistData(
  distFunc: (x: number, ...params: number[]) => number,
  params: { [key: string]: number },
  xBounds: number[]
): Data {
  const y: number[] = [];
  const x: number[] = [];
  xBounds.forEach((i) => {
    y.push(distFunc(i, ...Object.values(params)));
    x.push(i);
  });
  return {x: x, y: y};
}
  
function createArrayFromAtoB(a: number, b: number): number[] {
  return Array.from({ length: b - a + 1 }, (_, i) => a + i);
}

export function getDistributionData(
  dist: Distribution,
  distFunc: string,
): Data {
  const name = dist.name;
  const type = dist.type;
  const params = dist.params as { [key: string]: number };

  switch (type) {

    case "continuous": {
      const continuousFuncTable: {
        [key: string]: (x: number, ...params: number[]) => number;
      } = {
        pdf_pmf: continuousDists[name].pdf,
        cdf: continuousDists[name].cdf,
      };
      const func = continuousFuncTable[distFunc];

      return calculateContinuousDistData(
        func,
        params,
        continuousDists[name].xBounds(params)
      );
    }

    case "discrete": {
      const discreteFuncTable: {
        [key: string]: (x: number, ...params: number[]) => number;
      } = {
        pdf_pmf: discreteDists[name].pmf,
        cdf: discreteDists[name].cdf,
      };
      const func = discreteFuncTable[distFunc];

      return calculateDiscreteDistData(
        func,
        params,
        discreteDists[name].xBounds(params)
      );
    }
  }
  return {x: [], y: []};
}
