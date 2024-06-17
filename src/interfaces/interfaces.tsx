interface Data {
    x: number[];
    y: number[];
  }

interface Distribution {
    name: string;
    type: string; // Continuous or Discrete
    params: (number | string)[];
  }

export type { Data, Distribution }