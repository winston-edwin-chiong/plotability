import * as stdlib_dists from '@stdlib/stats-base-dists';

function calculateContinuousDistribution(distFunc: (x: number, ...params: number[]) => number, params: number[], bounds: number[], step: number): number[] {
  const data: number[] = [];
  for (let i = bounds[0]; i <= bounds[1]; i += 0.025) {
    data.push(Number(distFunc(i, ...params).toFixed(8)));    
  }
  return data;
}

function calculateDiscreteDistribution(distFunc: (x: number, ...params: number[]) => number, params: number[], bounds: number[]): number[] {
  const data: number[] = [];
  for (let i = bounds[0]; i <= bounds[1]; i += 1) {
    data.push(distFunc(i, ...params));
  }
  return data;
}

export function getDistributionData(dist: string, distType: string, params: number[], bounds: number[], calcType: string): number[] {
  if (distType === "continuous") {
    switch (dist) {
      case "arcsine": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.arcsine.pdf : stdlib_dists.arcsine.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "beta": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.beta.pdf : stdlib_dists.beta.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "betaprime": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.betaprime.pdf : stdlib_dists.betaprime.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "cauchy": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.cauchy.pdf : stdlib_dists.cauchy.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "chi": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.chi.pdf : stdlib_dists.chi.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "chisquare": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.chisquare.pdf : stdlib_dists.chisquare.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "cosine": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.cosine.pdf : stdlib_dists.cosine.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "erlang": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.erlang.pdf : stdlib_dists.erlang.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "exponential": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.exponential.pdf : stdlib_dists.exponential.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
        }
      case "f": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.f.pdf : stdlib_dists.f.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "frechet": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.frechet.pdf : stdlib_dists.frechet.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "gamma": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.gamma.pdf : stdlib_dists.gamma.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "gumbel": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.gumbel.pdf : stdlib_dists.gumbel.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "invgamma": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.invgamma.pdf : stdlib_dists.invgamma.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "kumaraswamy": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.kumaraswamy.pdf : stdlib_dists.kumaraswamy.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "laplace": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.laplace.pdf : stdlib_dists.laplace.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "levy": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.levy.pdf : stdlib_dists.levy.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "logistic": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.logistic.pdf : stdlib_dists.logistic.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "lognormal": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.lognormal.pdf : stdlib_dists.lognormal.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "normal": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.normal.pdf : stdlib_dists.normal.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "pareto": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.pareto1.pdf : stdlib_dists.pareto1.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "rayleigh": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.rayleigh.pdf : stdlib_dists.rayleigh.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "t": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.t.pdf : stdlib_dists.t.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "triangular": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.triangular.pdf : stdlib_dists.triangular.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
      case "uniform": {
        const func = calcType === "pdf_pmf" ? stdlib_dists.uniform.pdf : stdlib_dists.uniform.cdf;
        return calculateContinuousDistribution(func, params, bounds, 0.1);
      }
    }
  } else if (distType === "discrete") {
    switch (dist) {
      case "bernoulli": {
        return calculateDiscreteDistribution(stdlib_dists.bernoulli.pmf, [params[0]], bounds);
      }
      case "binomial": {
        return calculateDiscreteDistribution(stdlib_dists.binomial.pmf, [Math.floor(params[0]), params[1]], bounds);
      }
      // TODO: Add more discrete distributions here
    }
  }
  return [];
}
