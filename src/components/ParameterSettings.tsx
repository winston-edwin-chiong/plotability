import "@mantine/core/styles.css";
import DistributionsData from "../distributions_data.json";
import { Slider, NumberInput, Group, Stack } from "@mantine/core";
import { Distribution } from "../interfaces/interfaces";
import { getSliders } from "../utils/validations";
import { useState } from "react";

const MIN = -1 * 10 ** 7;
const MAX = 1 * 10 ** 7;
const DECIMAL_SCALE = 7;

export default function ParameterSettings({
  distribution,
  inputOnChange,
  sliderOnChange,
  sliderOnChangeEnd,
  index,
}: {
  distribution: Distribution;
  inputOnChange: (
    value: number | string,
    parameter: string,
    index: number
  ) => void;
  sliderOnChange: (
    value: number | string,
    parameter: string,
    index: number
  ) => void;
  sliderOnChangeEnd: (
    value: number | string,
    parameter: string,
    index: number
  ) => void;
  index: number;
}) {
  return (
    <>
      {DistributionsData.distributions
        .find((dist) => dist.value === distribution.name)
        ?.params.map((parameter) => (
          <Stack key={parameter}>
            <NumberInput
              value={distribution.params[parameter] as number}
              label={parameter}
              onChange={(value) => inputOnChange(value, parameter, index)}
              error={distribution.errors?.[parameter]}
              min={MIN}
              decimalScale={DECIMAL_SCALE}
              max={MAX}
              clampBehavior="strict"
            />
            <ParameterSlider
              distribution={distribution}
              parameter={parameter}
              sliderOnChange={sliderOnChange}
              sliderOnChangeEnd={sliderOnChangeEnd}
              index={index}
            />
          </Stack>
        ))}
    </>
  );
}

function ParameterSlider({
  distribution,
  parameter,
  sliderOnChange,
  sliderOnChangeEnd,
  index,
}: {
  distribution: Distribution;
  parameter: string;
  sliderOnChange: (
    value: number | string,
    parameter: string,
    index: number
  ) => void;
  sliderOnChangeEnd: (
    value: number | string,
    parameter: string,
    index: number
  ) => void;
  index: number;
}) {
  const sliders = getSliders(distribution);

  const [sliderSettings, setSliderSettings] = useState({
    min: sliders[parameter].min,
    max: sliders[parameter].max,
    step: sliders[parameter].step,
  });

  const handleSliderSettingChange = (
    value: number | string,
    setting: keyof typeof sliderSettings
  ) => {
    if (typeof value === "string") return;
    setSliderSettings({ ...sliderSettings, [setting]: value });
  };

  return (
    <>
      <Slider
        value={distribution.params[parameter] as number}
        min={sliderSettings.min}
        max={sliderSettings.max}
        step={sliderSettings.step}
        onChange={(value) => sliderOnChange(value, parameter, index)}
        onChangeEnd={(value) => sliderOnChangeEnd(value, parameter, index)}
      />
      <Group align="center" justify="center">
        <NumberInput
          value={sliderSettings.min}
          label="Min"
          onChange={(value) => handleSliderSettingChange(value, "min")}
          hideControls
          min={MIN}
          decimalScale={DECIMAL_SCALE}
          max={MAX}
        />
        <NumberInput
          value={sliderSettings.max}
          label="Max"
          onChange={(value) => handleSliderSettingChange(value, "max")}
          hideControls
          min={MIN}
          decimalScale={DECIMAL_SCALE}
          max={MAX}
        />
        <NumberInput
          value={sliderSettings.step}
          label="Step"
          onChange={(value) => handleSliderSettingChange(value, "step")}
          hideControls
          min={MIN}
          decimalScale={DECIMAL_SCALE}
          max={MAX}
        />
      </Group>
      <div>Slider Settings: {JSON.stringify(sliderSettings)}</div>
    </>
  );
}
