import "@mantine/core/styles.css";
import DistributionJSON from "../distributions_data.json";
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
      {DistributionJSON.distributions
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

  const [sliderSettings, setSliderSettings] = useState<{
    min: number | string;
    max: number | string;
    step: number | string;
  }>({
    min: sliders[parameter].min,
    max: sliders[parameter].max,
    step: sliders[parameter].step,
  });

  const handleSliderSettingChange = (
    value: number | string,
    setting: keyof typeof sliderSettings
  ) => {
    setSliderSettings({ ...sliderSettings, [setting]: value });
  };

  const handleSliderSettingBlur = (setting: keyof typeof sliderSettings) => {
    if (typeof sliderSettings[setting] === "string") {
      // Remove leading zeroes from the string, and parse the string to a float.
      // If the value is still invalid, set it to the default value.
      const replaced = (sliderSettings[setting] as string).replace(/^0+/, "");
      const parsedValue = parseFloat(replaced);
      setSliderSettings({
        ...sliderSettings,
        [setting]: isNaN(parsedValue)
          ? sliders[parameter][setting]
          : parsedValue
      });
    }
  };

  return (
    <>
      <Slider
        value={distribution.params[parameter] as number}
        min={sliderSettings.min as number}
        max={sliderSettings.max as number}
        step={sliderSettings.step as number}
        onChange={(value) => sliderOnChange(value, parameter, index)}
        onChangeEnd={(value) => sliderOnChangeEnd(value, parameter, index)}
      />
      <Group align="center" justify="center">
        <NumberInput
          value={sliderSettings.min as number | string}
          label="Min"
          onChange={(value) => handleSliderSettingChange(value, "min")}
          onBlur={() => handleSliderSettingBlur("min")}
          trimLeadingZeroesOnBlur={false} // Because of the way the NumberInput component works, we need to set this to false for onBlur to work correctly.
          hideControls
          min={MIN}
          decimalScale={DECIMAL_SCALE}
          max={MAX}
        />
        <NumberInput
          value={sliderSettings.max as number | string}
          label="Max"
          onChange={(value) => handleSliderSettingChange(value, "max")}
          onBlur={() => handleSliderSettingBlur("max")}
          trimLeadingZeroesOnBlur={false} // Because of the way the NumberInput component works, we need to set this to false for onBlur to work correctly.
          hideControls
          min={MIN}
          decimalScale={DECIMAL_SCALE}
          max={MAX}
        />
        <NumberInput
          value={sliderSettings.step as number | string}
          label="Step"
          onChange={(value) => handleSliderSettingChange(value, "step")}
          onBlur={() => handleSliderSettingBlur("step")}
          trimLeadingZeroesOnBlur={false} // Because of the way the NumberInput component works, we need to set this to false for onBlur to work correctly.
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
