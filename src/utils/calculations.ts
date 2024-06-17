import * as stdlib from '@stdlib/stats-base-dists'


export function getDistributionData(dist: string, type: string, params: number[], bounds: number[]): number[] {
    const data: number[] = [];
  
    switch (type) {
  
      case "continuous":
  
        switch (dist) {
  
          case "normal": {
            const pdf = stdlib.normal.pdf;
            for (let i = bounds[0]; i <= bounds[1]; i += 0.05) {
              data.push(pdf(i, params[0], params[1]));
            }
          }
            break;
  
          case "exponential": {
            const pdf = stdlib.exponential.pdf;
            for (let i = bounds[0]; i <= bounds[1]; i += 0.05) {
              data.push(pdf(i, params[0]));
            }
          }
            break;
        }
  
        break;
  
      case "discrete":
  
        switch (dist) {
  
          case "binomial": {
            for (let i = bounds[0]; i <= bounds[1]; i += 1) {
              data.push(stdlib.binomial.pmf(i, Math.floor(params[0]), params[1]));
            }
          }
        }
    }
    return data;
  }
  