interface Data {
  x: number[];
  y: number[];
}

interface Distribution {
  name: string;
  type: "continuous" | "discrete" | "";
  params: { [parameter: string]: number | string };
  paramErrors: { [parameter: string]: string }
}

export type { Data, Distribution };
