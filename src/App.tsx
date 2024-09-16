import "@mantine/core/styles.css";
import DistributionsData from "./distributions_data.json";
import { MantineProvider, Button, Radio, Group } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";
import {
  Header,
  ParameterSettings,
  DistributionSelect,
  Figure,
  QuantileSettings,
} from "./components";
import { getDistributionData } from "./utils/calculations";
import { Distribution, Data } from "./interfaces/interfaces";
import { validateDistribution } from "./utils/validations";

/* Note that '0' is a valid parameter value for some distributions. */
/* The code gets messy and there's a lot of type gymastics. A lot of voodoo. */

const MAX_DISTRIBUTIONS = 3;

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
  const [data, setData] = useState<Data[]>([{ name: "", type: "", data: [] }]);
  const [quantiles, setQuantiles] = useState<[number, number][]>([[0, 1]]);

  const handleDistributionChange = (value: string | null, index: number) => {
    if (!value || value === distributions[index].name) return;

    // Find the distribution information from the data.
    const distributionFromJSON = structuredClone(
      DistributionsData.distributions.find((dist) => dist.value === value)
    );

    const type = distributionFromJSON?.type;
    const newParamsValues = distributionFromJSON?.params?.reduce(
      (o, key) => Object.assign(o, { [key]: "" }),
      {}
    ) as {
      [key: string]: number | string;
    };
    const defaultQuantiles = distributionFromJSON?.quantiles as [
      number,
      number
    ];

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

    const newQuantiles = [...quantiles];
    newQuantiles[index] = defaultQuantiles;
    setQuantiles(newQuantiles);
  };

  const handlePlotButtonClick = () => {
    // Validate the distribution parameters before plotting.
    const newDistributions = [...distributions];
    for (let i = 0; i < distributions.length; i++) {
      const errors = validateDistribution(distributions[i]);
      newDistributions[i] = { ...distributions[i], errors: errors };
    }
    setDistributions(newDistributions);
    for (let i = 0; i < newDistributions.length; i++) {
      // Don't calculate & plot if there are errors.
      if (!(Object.keys(newDistributions[i].errors).length === 0)) return;
    }

    // Calculate the new data and update the chart.
    const newData = [...data];
    for (let i = 0; i < newDistributions.length; i++) {
      const chartData = getDistributionData(
        newDistributions[i],
        distFunction,
        quantiles[i]
      );
      newData[i].data = chartData;
      newData[i].name =
        newDistributions[i].name +
        "(" +
        Object.values(newDistributions[i].params) +
        ")";
      newData[i].type = newDistributions[i].type;
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
    for (let i = 0; i < newDistributions.length; i++) {
      if (!(Object.keys(newDistributions[i].errors).length === 0)) return;
    }

    // Calculate the new data and update the chart.
    const newData = [...data];
    for (let i = 0; i < newDistributions.length; i++) {
      const chartData = getDistributionData(
        newDistributions[i],
        distFunction,
        quantiles[i]
      );
      newData[i].data = chartData;
      newData[i].name =
        newDistributions[i].name +
        "(" +
        Object.values(newDistributions[i].params) +
        ")";
      newData[i].type = newDistributions[i].type;
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
    setData([...data, { name: "", type: "", data: [] }]);
    setQuantiles([...quantiles, [0, 1]]);
  };

  const handleRemoveClick = (index: number) => {
    // Remove the distribution, its data, and its quantile from the state.
    const newDistributions = [...distributions];
    newDistributions.splice(index, 1);
    setDistributions(newDistributions);
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    const newQuantiles = [...quantiles];
    newQuantiles.splice(index, 1);
    setQuantiles(newQuantiles);
  };

  const handleQuantileChange = (
    value: number | string,
    index: number,
    bound: 0 | 1
  ) => {
    if (typeof value === "string") return;
    const newQuantiles = [...quantiles];
    newQuantiles[index][bound] = value;
    setQuantiles(newQuantiles);
  };

  const handleQuantileResetOnClick = (index: number) => {
    // Find the distribution information from the data.
    const distributionFromJSON = structuredClone(
      DistributionsData.distributions.find(
        (dist) => dist.value === distributions[index].name
      )
    );
    const defaultQuantiles = distributionFromJSON?.quantiles as [
      number,
      number
    ];

    const newQuantiles = [...quantiles];
    newQuantiles[index] = defaultQuantiles;
    setQuantiles(newQuantiles);
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
          <QuantileSettings
            quantiles={quantiles}
            quantilesOnChange={handleQuantileChange}
            quantileResetOnClick={handleQuantileResetOnClick}
            index={index}
          />
          {distributions.length > 1 && (
            <Button variant="default" onClick={() => handleRemoveClick(index)}>
              - REMOVE DISTRIBUTION
            </Button>
          )}
        </div>
      ))}
      <Button variant="default" onClick={() => handlePlotButtonClick()}>
        PLOT!
      </Button>
      {distributions.length < MAX_DISTRIBUTIONS && (
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
        </p>
        <p>
          <strong>Distribution Object Length:</strong> {distributions.length}
        </p>
        <p>
          <strong>Data Object Length:</strong> {data.length}
        </p>
        <p>
          <strong>Calculation Type: </strong>
          {distFunction}
        </p>
        <p>
          <strong>Quantile: </strong>
          {JSON.stringify(quantiles)}
        </p>
      </div>
      <div>
        <Figure data={data} />
      </div>
    </MantineProvider>
  );
}
