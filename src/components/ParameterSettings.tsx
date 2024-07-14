import "@mantine/core/styles.css";
import DistributionsData from "../distributions_data.json";
import { Slider, NumberInput, Group, Stack } from "@mantine/core";
import { Distribution } from "../interfaces/interfaces";
import { getSliders } from "../utils/validations";
import { useState } from "react";

export default function ParameterSettings({
  distribution,
  inputOnChange,
  sliderOnChange,
  sliderOnChangeEnd,
}: {
  distribution: Distribution;
  inputOnChange: (value: number | string, parameter: string) => void;
  sliderOnChange: (value: number | string, parameter: string) => void;
  sliderOnChangeEnd: (value: number | string, parameter: string) => void;
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
              onChange={(value) => inputOnChange(value, parameter)}
              error={distribution.paramErrors?.[parameter]}
            />
            <ParameterSlider
              distribution={distribution}
              parameter={parameter}
              sliderOnChange={sliderOnChange}
              sliderOnChangeEnd={sliderOnChangeEnd}
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
}: {
  distribution: Distribution;
  parameter: string;
  sliderOnChange: (value: number | string, parameter: string) => void;
  sliderOnChangeEnd: (value: number | string, parameter: string) => void;
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
        onChange={(value) => sliderOnChange(value, parameter)}
        onChangeEnd={(value) => sliderOnChangeEnd(value, parameter)}
      />
      <Group align="center" justify="center">
        <NumberInput
          value={sliderSettings.min}
          label="Min"
          onChange={(value) => handleSliderSettingChange(value, "min")}
        />
        <NumberInput
          value={sliderSettings.max}
          label="Max"
          onChange={(value) => handleSliderSettingChange(value, "max")}
        />
        <NumberInput
          value={sliderSettings.step}
          label="Step"
          onChange={(value) => handleSliderSettingChange(value, "step")}
        />
      </Group>
      <div>Slider Settings: {JSON.stringify(sliderSettings)}</div>
    </>
  );
}
