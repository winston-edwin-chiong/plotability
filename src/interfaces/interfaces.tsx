interface Data {
  x: number[];
  y: number[];
}

interface Distribution {
  name: string;
  type: string; // "continuous" or "discrete"
  params: { [parameter: string]: number | string };
  params_errors?: { [parameter: string]: string };
}

export type { Data, Distribution };
