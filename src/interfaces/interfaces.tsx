interface Point {
  x: number;
  y: number;
}

interface Distribution {
  name: string;
  type: "continuous" | "discrete" | "";
  params: { [parameter: string]: number | string };
  errors: { [option: string]: string };
}

interface Data {
  name: string;
  type: "continuous" | "discrete" | "";
  data: Point[];
}

export type { Point, Distribution, Data };
