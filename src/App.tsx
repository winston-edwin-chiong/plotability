import "@mantine/core/styles.css";
import DistributionsData from "./distributions_data.json";
import { MantineProvider, Button, Radio, Group } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";
import {
  Header,
  ContinuousChart,
  DiscreteChart,
  ParameterSettings,
  DistributionSelect,
} from "./components";
import { getDistributionData } from "./utils/calculations";
import { Data, Distribution } from "./interfaces/interfaces";
import { validateDistribution } from "./utils/validations";

/* Note that '0' is a valid parameter value for some distributions. */

export default function App() {
  const [distCategory, setdistCategory] = useInputState<string>("all");
  const [distFunction, setDistFunction] = useInputState<string>("pdf_pmf");
  const [distribution, setDistribution] = useState<Distribution>({
    name: "",
    type: "",
    params: {},
    errors: {},
  });
  const [data, setData] = useState<Data>({ x: [], y: [] });
  const [chartType, setChartType] = useState<string>("");

  const handleDistributionChange = (value: string | null) => {
    if (!value || value === distribution.name) return;

    // Find the distribution parameters from the data.
    const type = DistributionsData.distributions.find(
      (dist) => dist.value === value
    )?.type;
    const newParamsValues = DistributionsData.distributions
      .find((dist) => dist.value === value)
      ?.params.reduce((o, key) => Object.assign(o, { [key]: "" }), {}) as {
      [key: string]: number | string;
    };

    // Copy over parameter values up to the number of the new distribution's parameters.
    const oldKeys = Object.keys(distribution.params);
    const newKeys = Object.keys(newParamsValues);
    for (let i = 0; i < newKeys.length; i++) {
      if (i < oldKeys.length) {
        newParamsValues[newKeys[i]] = distribution.params[oldKeys[i]];
      } else {
        newParamsValues[newKeys[i]] = "";
      }
    }

    setDistribution({
      name: value,
      type: type as "" | "continuous" | "discrete",
      params: newParamsValues,
      errors: {},
    });
  };

  const handlePlotButtonClick = () => {
    // Validate the distribution parameters before plotting.
    const errors = validateDistribution(distribution);
    setDistribution({ ...distribution, errors: errors });
    console.log(errors);
    if (Object.keys(errors).length !== 0) return;

    // Calculate the new data and update the chart.
    const data = getDistributionData(distribution, distFunction);
    setData(data);
    setChartType(distribution.type);
  };

  const handleParamChange = (value: number | string, parameter: string) => {
    const newParamsValues = { ...distribution.params };
    newParamsValues[parameter] = value;
    setDistribution({ ...distribution, params: newParamsValues });
  };

  const handleSliderChangeEnd = (value: number | string, parameter: string) => {
    // The sliders also update the chart. This function is called when the user stops dragging the slider.
    const newParamsValues = { ...distribution.params };
    newParamsValues[parameter] = value;
    const newDistribution = { ...distribution, params: newParamsValues };
    setDistribution(newDistribution);

    // Validate the distribution parameters before plotting.
    const errors = validateDistribution(newDistribution);
    setDistribution({ ...newDistribution, errors: errors });
    console.log(errors);
    if (Object.keys(errors).length !== 0) return;

    // Calculate the new data and update the chart.
    const data = getDistributionData(newDistribution, distFunction);
    setData(data);
    setChartType(distribution.type);
  };

  return (
    <MantineProvider>
      <Header />
      <Radio.Group
        value={distCategory}
        onChange={(value) => setdistCategory(value)}
      >
        <Group>
          <Radio value="all" label="All" />
          <Radio value="continuous" label="Continuous" />
          <Radio value="discrete" label="Discrete" />
        </Group>
      </Radio.Group>
      <DistributionSelect
        distribution={distribution}
        distCategory={distCategory}
        distributionOnChange={handleDistributionChange}
      />
      <Radio.Group
        value={distFunction}
        onChange={(value) => setDistFunction(value)}
      >
        <Group>
          <Radio value="pdf_pmf" label="PDF / PMF" />
          <Radio value="cdf" label="CDF" />
        </Group>
      </Radio.Group>
      <ParameterSettings
        distribution={distribution}
        inputOnChange={handleParamChange}
        sliderOnChange={handleParamChange}
        sliderOnChangeEnd={handleSliderChangeEnd}
      />
      <Button variant="default" onClick={() => handlePlotButtonClick()}>
        PLOT!
      </Button>
      {distribution.name && <Button variant="default">+ ADD ANOTHER!</Button>}

      {/* Render state in the DOM for debugging */}
      <div style={{ marginTop: "20px" }}>
        <h3>Debug Information:</h3>
        <p>
          <strong>Distribution Object:</strong> {JSON.stringify(distribution)}
        </p>
        <p>
          <strong>Calculation Type: </strong>
          {distFunction}
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        {chartType === "continuous" && <ContinuousChart data={data} />}
        {chartType === "discrete" && <DiscreteChart data={data} />}
      </div>
    </MantineProvider>
  );
}
