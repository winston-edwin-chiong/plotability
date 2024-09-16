import "@mantine/core/styles.css";
import { Button, NumberInput, Group } from "@mantine/core";

export default function QuantileSettings({
  quantiles,
  quantilesOnChange,
  quantileResetOnClick,
  index,
}: {
  quantiles: [number, number][];
  quantilesOnChange: (
    value: number | string,
    index: number,
    bound: 0 | 1
  ) => void;
  quantileResetOnClick: (index: number) => void;
  index: number;
}) {
  return (
    <Group align="center" justify="center">
      <NumberInput
        value={quantiles[index][0]}
        onChange={(value) => quantilesOnChange(value, index, 0)}
        min={0}
        max={1}
        step={0.005}
      />
      <NumberInput
        value={quantiles[index][1]}
        onChange={(value) => quantilesOnChange(value, index, 1)}
        min={0}
        max={1}
        step={0.005}
      />
      <Button onClick={() => quantileResetOnClick(index)}>RESET</Button>
    </Group>
  );
}
