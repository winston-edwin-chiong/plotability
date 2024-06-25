import { Distribution } from "../interfaces/interfaces";

export function testValidate(dist: Distribution) {
  if (testNull(dist)) {
    return testNull(dist);
  }
  return validateContinuousDists[dist.name]?.validate(dist.params as { [key: string]: number });
}

function testNull(dist: Distribution) {
  if (!dist.name || !dist.type) {
    return "Select a distribution!";
  } else if (Object.values(dist.params).includes("")) {
    return "Fill in all parameters!";
  }
  return "";
}
const validateContinuousDists: {
  [key: string]: {
    validate: (params: { [key: string]: number }) => string;
    sliders: (value: number) => { min: number; max: number; step: number };
  };
} = {
  normal: {
    validate: (params) => {
      if (params["sigma"] <= 0) {
        return "Standard deviation must be greater than 0!";
      }
      return "";
    },
    sliders: (value) => {
      return {
        min: value - 10 > 0 ? value - 10 : 0,
        max: value + 10,
        step: 1,
      };
    },
  },
};
