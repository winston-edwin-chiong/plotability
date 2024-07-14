interface Data {
  x: number[];
  y: number[];
}

interface Distribution {
  name: string;
  type: "continuous" | "discrete" | "";
  params: { [parameter: string]: number | string };
  errors: { [option: string]: string }
}

export type { Data, Distribution };
