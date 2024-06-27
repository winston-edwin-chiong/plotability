interface Data {
  x: number[];
  y: number[];
}

interface Distribution {
  name: string;
  type: string; // Continuous or Discrete
  params: { [key: string]: number | string }
  params_errors?: { [key: string]: string }
}

export type { Data, Distribution };
 