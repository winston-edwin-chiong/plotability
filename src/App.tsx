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
  const [distributions, setDistributions] = useState<Distribution[]>([
    {
      name: "",
      type: "",
      params: {},
      errors: {},
    },
  ]);
  const [data, setData] = useState<Data[]>([{ x: [], y: [] }]);
  const [chartType, setChartType] = useState<string>("");

  const handleDistributionChange = (value: string | null, index: number) => {
    if (!value || value === distributions[index].name) return;

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
    const oldKeys = Object.keys(distributions[index].params);
    const newKeys = Object.keys(newParamsValues);
    for (let i = 0; i < newKeys.length; i++) {
      if (i < oldKeys.length) {
        newParamsValues[newKeys[i]] = distributions[index].params[oldKeys[i]];
      } else {
        newParamsValues[newKeys[i]] = "";
      }
    }

    const newDistributions = [...distributions];
    newDistributions[index] = {
      name: value,
      type: type as "" | "continuous" | "discrete",
      params: newParamsValues,
      errors: {},
    };
    setDistributions(newDistributions);
  };

  const handlePlotButtonClick = () => {
    console.log("Plot button clicked!");
    // Validate the distribution parameters before plotting.
    const newDistributions = [...distributions];
    for (let i = 0; i < distributions.length; i++) {
      const errors = validateDistribution(distributions[i]);
      newDistributions[i] = { ...distributions[i], errors: errors };
      console.log(errors);
    }
    setDistributions(newDistributions);
    for (let i = 0; i < distributions.length; i++) {
      // Don't calculate & plot if there are errors.
      if (!(Object.keys(distributions[i].errors).length === 0)) return;
    }

    console.log("Calculating and plotting...");
    // Calculate the new data and update the chart.
    const newData = [...data];
    for (let i = 0; i < newDistributions.length; i++) {
      const chartData = getDistributionData(newDistributions[i], distFunction);
      newData[i] = chartData;
    }
    setData(newData);
  };

  const handleParamChange = (
    value: number | string,
    parameter: string,
    index: number
  ) => {
    const newParamsValues = { ...distributions[index].params };
    newParamsValues[parameter] = value;
    const newDistributions = [...distributions];
    newDistributions[index] = {
      ...distributions[index],
      params: newParamsValues,
    };
    setDistributions(newDistributions);
  };

  const handleSliderChangeEnd = (
    value: number | string,
    parameter: string,
    index: number
  ) => {
    console.log("Slider change end!");
    // The sliders also update the chart. This function is called when the user stops dragging the slider.
    const newParamsValues = { ...distributions[index].params };
    newParamsValues[parameter] = value;
    const newDistributions = [...distributions];
    newDistributions[index] = {
      ...distributions[index],
      params: newParamsValues,
    };

    // Validate the distribution parameters before plotting.
    for (let i = 0; i < newDistributions.length; i++) {
      const errors = validateDistribution(newDistributions[i]);
      newDistributions[i] = { ...newDistributions[i], errors: errors };
    }
    setDistributions(newDistributions);
    // Don't calculate & plot if there are errors.
    for (let i = 0; i < distributions.length; i++) {
      if (!(Object.keys(distributions[i].errors).length === 0)) return;
    }

    console.log("Calculating and plotting...");
    // Calculate the new data and update the chart.
    const newData = [...data];
    for (let i = 0; i < newDistributions.length; i++) {
      const chartData = getDistributionData(newDistributions[i], distFunction);
      newData[i] = chartData;
    }
    setData(newData);
  };

  const handleAddClick = () => {
    setDistributions([
      ...distributions,
      {
        name: "",
        type: "",
        params: {},
        errors: {},
      },
    ]);
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
      <Radio.Group
        value={distFunction}
        onChange={(value) => setDistFunction(value)}
      >
        <Group>
          <Radio value="pdf_pmf" label="PDF / PMF" />
          <Radio value="cdf" label="CDF" />
        </Group>
      </Radio.Group>
      {distributions.map((distribution, index) => (
        <div key={index}>
          <DistributionSelect
            distribution={distribution}
            distCategory={distCategory}
            distributionOnChange={handleDistributionChange}
            index={index}
          />
          <ParameterSettings
            distribution={distribution}
            inputOnChange={handleParamChange}
            sliderOnChange={handleParamChange}
            sliderOnChangeEnd={handleSliderChangeEnd}
            index={index}
          />
        </div>
      ))}
      <Button variant="default" onClick={() => handlePlotButtonClick()}>
        PLOT!
      </Button>
      {distributions.length < 3 && (
        <Button variant="default" onClick={handleAddClick}>
          + ADD ANOTHER!
        </Button>
      )}

      {/* Render state in the DOM for debugging */}
      <div style={{ marginTop: "20px" }}>
        <h3>Debug Information:</h3>
        <p>
          <strong>Distribution Object:</strong>{" "}
          {JSON.stringify(distributions, null, 2)}
          <strong>Distribution Object Length:</strong> {distributions.length}
        </p>
        <p>
          <strong>Calculation Type: </strong>
          {distFunction}
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <ContinuousChart data={data} />
        {/* {chartType === "continuous" && <ContinuousChart data={data} />}
        {chartType === "discrete" && <DiscreteChart data={data} />} */}
      </div>
    </MantineProvider>
  );
}
