import "@mantine/core/styles.css";
import "katex/dist/katex.min.css";
import DistributionJSON from "./distributions_data.json";
import { MantineProvider, Button, Radio, Group } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";
import {
  Header,
  ParameterSettings,
  DistributionSelect,
  Figure,
  QuantileSettings,
  DistributionProperties
} from "./components";
import { getDistributionData } from "./utils/calculations";
import { Distribution, Data } from "./interfaces/interfaces";
import { validateDistribution } from "./utils/validations";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

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
      markdownContent: "",
      params: {},
      properties: {},
      errors: {},
    },
  ]);
  const [data, setData] = useState<Data[]>([{ name: "", type: "", data: [] }]);
  const [quantiles, setQuantiles] = useState<
    [number | string, number | string][]
  >([[0, 1]]);

  const handleDistributionChange = async (
    value: string | null,
    index: number
  ) => {
    if (!value || value === distributions[index].name) return;

    // Find the distribution information from the data.
    const distributionData = DistributionJSON.distributions.filter(
      (dist) => dist.value === value
    )[0];

    const type = distributionData?.type;
    const newParamsValues = distributionData?.params?.reduce(
      (o, key) => Object.assign(o, { [key]: "" }),
      {}
    ) as {
      [key: string]: number | string;
    };
    const defaultQuantiles = distributionData?.quantiles as [number, number];

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

    // Fetch the distribution's markdown content.
    let markdownContent = "";
    try {
      markdownContent = await import(`./markdown/${value}.md`).then(
        (res) => res.default
      );
    } catch {
      markdownContent = "**This file doesn't exist yet!**";
    }

    const newDistributions = [
      ...distributions.slice(0, index),
      {
        name: value,
        type: (type as "continuous") || "discrete" || "",
        markdownContent: markdownContent,
        params: newParamsValues,
        properties: {},
        errors: {},
      },
      ...distributions.slice(index + 1),
    ];
    setDistributions(newDistributions);

    const newQuantiles = [
      ...quantiles.slice(0, index),
      defaultQuantiles,
      ...quantiles.slice(index + 1),
    ];
    setQuantiles(newQuantiles);
  };

  const handlePlotButtonClick = () => {
    // Validate the distribution parameters before plotting.
    const newDistributions = distributions.map((dist) => {
      const errors = validateDistribution(dist);
      return { ...dist, errors: errors };
    });
    setDistributions(newDistributions);

    // Don't calculate & plot if there are errors.
    for (let i = 0; i < newDistributions.length; i++) {
      if (!(Object.keys(newDistributions[i].errors).length === 0)) return;
    }

    // Calculate the new data and update the chart.
    const newData = data.map((data, i) => {
      const chartData = getDistributionData(
        newDistributions[i],
        distFunction,
        quantiles[i] as [number, number]
      );
      return {
        ...data,
        data: chartData,
        name:
          newDistributions[i].name +
          "(" +
          Object.values(newDistributions[i].params) +
          ")",
        type: newDistributions[i].type,
      };
    });
    setData(newData);
  };

  const handleParamChange = (
    value: number | string,
    parameter: string,
    index: number
  ) => {
    const newDistributions = distributions.map((dist, i) => {
      if (i === index) {
        return { ...dist, params: { ...dist.params, [parameter]: value } };
      }
      return dist;
    });
    setDistributions(newDistributions);
  };

  const handleSliderChangeEnd = (
    value: number | string,
    parameter: string,
    index: number
  ) => {
    // The sliders also update the chart. This function is called when the user stops dragging the slider.
    const updatedDistributions = distributions.map((dist, i) => {
      if (i === index) {
        return { ...dist, params: { ...dist.params, [parameter]: value } };
      }
      return dist;
    });

    // Validate the distribution parameters before plotting.
    const newDistributions = updatedDistributions.map((dist) => {
      const errors = validateDistribution(dist);
      return { ...dist, errors: errors };
    });
    setDistributions(newDistributions);

    // Don't calculate & plot if there are errors.
    for (let i = 0; i < newDistributions.length; i++) {
      if (!(Object.keys(newDistributions[i].errors).length === 0)) return;
    }

    // Calculate the new data and update the chart.
    const newData = data.map((data, i) => {
      const chartData = getDistributionData(
        newDistributions[i],
        distFunction,
        quantiles[i] as [number, number]
      );
      return {
        ...data,
        data: chartData,
        name:
          newDistributions[i].name +
          "(" +
          Object.values(newDistributions[i].params) +
          ")",
        type: newDistributions[i].type,
      };
    });
    setData(newData);
  };

  const handleAddClick = () => {
    setDistributions([
      ...distributions,
      {
        name: "",
        type: "",
        markdownContent: "",
        params: {},
        properties: {},
        errors: {},
      },
    ]);
    setData([...data, { name: "", type: "", data: [] }]);
    setQuantiles([...quantiles, [0, 1]]);
  };

  const handleRemoveClick = (index: number) => {
    // Remove the distribution, its data, and its quantile from the state.
    const newDistributions = distributions.filter((_, i) => i !== index);
    setDistributions(newDistributions);
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    const newQuantiles = quantiles.filter((_, i) => i !== index);
    setQuantiles(newQuantiles);
  };

  const handleQuantileChange = (
    value: number | string,
    index: number,
    bound: 0 | 1
  ) => {
    const newQuantiles = quantiles.map((quantile, i) => {
      if (i === index) {
        return [
          ...quantile.slice(0, bound),
          value,
          ...quantile.slice(bound + 1),
        ];
      }
      return quantile;
    });
    setQuantiles(newQuantiles as [number, number][]);
  };

  const handleQuantileResetOnClick = (index: number) => {
    if (!distributions[index].name) return;
    // Find the distribution information from the data.
    const distributionData = DistributionJSON.distributions.filter(
      (dist) => dist.value === distributions[index].name
    )[0];
    const defaultQuantiles = distributionData?.quantiles as [number, number];

    const newQuantiles = [
      ...quantiles.slice(0, index),
      defaultQuantiles,
      ...quantiles.slice(index + 1),
    ];
    setQuantiles(newQuantiles);
  };

  const handleQuantileBlur = (index: number, bound: number) => {
    if (!distributions[index].name) return;
    const newQuantiles = quantiles.map((quantile, i) => {
      if (i === index && typeof quantile[bound] === "string") {
        // Remove leading zeroes from the string, and parse the string to a float.
        // If the value is still invalid, set it to the default value.
        const replaced = (quantile[bound] as string).replace(/^0+/, "");
        const parsedValue = parseFloat(replaced);
        return [
          ...quantile.slice(0, bound),
          isNaN(parsedValue) ? (bound === 0 ? 0.005 : 0.995) : parsedValue,
          ...quantile.slice(bound + 1),
        ];
      }
      return quantile;
    });
    setQuantiles(newQuantiles as [number, number][]);
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
            quantileBlur={handleQuantileBlur}
            index={index}
          />
          <Markdown
            children={distribution.markdownContent}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          ></Markdown>
          <DistributionProperties distribution={distribution} />
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
      <div>
        <Figure data={data} distFunc={distFunction} />
      </div>
    </MantineProvider>
  );
}
