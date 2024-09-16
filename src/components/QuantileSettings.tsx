import "@mantine/core/styles.css";
import { Button, NumberInput, Group } from "@mantine/core";

export default function QuantileSettings({
  quantiles,
  quantilesOnChange,
  quantileResetOnClick,
  quantileBlur,
  index,
}: {
  quantiles: [number | string, number | string][];
  quantilesOnChange: (
    value: number | string,
    index: number,
    bound: 0 | 1
  ) => void;
  quantileResetOnClick: (index: number) => void;
  quantileBlur: (index: number, bound: number) => void
  index: number;
}) {
  return (
    <Group align="center" justify="center">
      <NumberInput
        value={quantiles[index][0]}
        onChange={(value) => quantilesOnChange(value, index, 0)}
        onBlur={() => {quantileBlur(index, 0)}}
        trimLeadingZeroesOnBlur={false} //* Because of the way the NumberInput component works, we need to set this to false for onBlur to work correctly.
        min={0}
        max={1}
        step={0.005}
      />
      <NumberInput
        value={quantiles[index][1]}
        onChange={(value) => quantilesOnChange(value, index, 1)}
        onBlur={() => {quantileBlur(index, 1)}}
        trimLeadingZeroesOnBlur={false} //* Because of the way the NumberInput component works, we need to set this to false for onBlur to work correctly.
        min={0}
        max={1}
        step={0.005}
      />
      <Button onClick={() => quantileResetOnClick(index)}>RESET</Button>
    </Group>
  );
}
