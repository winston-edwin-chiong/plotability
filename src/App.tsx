import '@mantine/core/styles.css';
import distributions from './distributions.json';
import { MantineProvider, Button, Radio, Group, Select, NumberInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import * as stdlib from '@stdlib/stats-base-dists'
import { useState } from 'react';
import ContinuousChart from './components/ContinuousChart';

interface Data {
  x: number[];
  y: number[];
}

export default function App() {

  const [radioValue, setRadioValue] = useInputState<string>("all");
  const [selectedDistribution, setSelectedDistribution] = useInputState<string | null>(null);
  const [paramsValues, setParamsValues] = useState<(number | null)[]>([]);
  const [data, setData] = useState<Data>({ x: [], y: [] });
  const [bounds, setBounds] = useState<(number | null)[]>([null, null]);

  const handleDistributionChange = (value: string | null) => {
    setSelectedDistribution(value);
    const newParamsValues = distributions.distributions
      .find(dist => dist.value === value)?.params
      .map((_, index) => paramsValues[index] || null);
    setParamsValues(newParamsValues as (number | null)[]);
  }

  const handlePlotButtonClick = () => {
    const type = distributions.distributions.find(dist => dist.value === selectedDistribution)?.type;
    const y = getIterator(selectedDistribution, type as string, paramsValues as number[], bounds as number[]);
    const x = [...bounds] as number[];
    setData({ x, y });
    console.log(data);
  }

  const handleParamChange = (value: number | string, index: number) => {
    value = typeof value === "string" ? parseFloat(value) : value;
    const newParamsValues = [...paramsValues];
    newParamsValues[index] = value;
    setParamsValues(newParamsValues);
  }

  const handleBoundsChange = (value: number | string, index: number) => {
    value = typeof value === "string" ? parseFloat(value) : value;
    const newBounds = [...bounds];
    newBounds[index] = value;
    setBounds(newBounds);
  }


  return <>
    <MantineProvider>
      <Radio.Group
        value={radioValue}
        onChange={(value) => setRadioValue(value)}
      >
        <Group>
          <Radio value="all" label="All" />
          <Radio value="continuous" label="Continuous" />
          <Radio value="discrete" label="Discrete" />
        </Group>
      </Radio.Group>
      <Select
        placeholder="Select your favorite distribution!"
        data={radioValue === "all"
          ? distributions.distributions.sort((a, b) => a.label.localeCompare(b.label))
          : distributions.distributions.filter(dist => dist.type === radioValue).sort((a, b) => a.label.localeCompare(b.label))}
        onChange={(value) => handleDistributionChange(value)}
        searchable={true}
      />
      {distributions.distributions.find(dist => dist.value === selectedDistribution)?.params.map((parameter, index) => (
        <NumberInput key={index} label={parameter} onChange={(value) => handleParamChange(value, index)} />
      ))}
      <NumberInput label="Left Bound" onChange={(value) => handleBoundsChange(value, 0)}/>
      <NumberInput label="Right Bound" key="right" onChange={(value) => handleBoundsChange(value, 1)}/>
      <Button variant='default' onClick={() => handlePlotButtonClick()}>PLOT!</Button>

      {/* Render state in the DOM for debugging */}
      <div style={{ marginTop: '20px' }}>
        <h3>Debug Information:</h3>
        <p><strong>Selected Distribution:</strong> {selectedDistribution}</p>
        <p><strong>Params Values:</strong> {JSON.stringify(paramsValues)}</p>
        <p><strong>Bounds Values:</strong> {JSON.stringify(bounds)}</p>
        {/* <p><strong>Data Values:</strong> {JSON.stringify(data)}</p> */}
      </div>
      
      {/* Render the line chart */}
      <div style={{ marginTop: '20px' }}>
        <ContinuousChart data={data.y} bounds={data.x} />
      </div>

    </MantineProvider>
  </>
}

function getIterator(dist: string | null, type: string, params: number[], bounds: number[]): number[] {
  const data: number[] = [];

  switch (type) {

    case "continuous":

      switch (dist) {

        case "normal": {
            const pdf = stdlib.normal.pdf;
            for (let i = bounds[0]; i <= bounds[1]; i += 0.05) {
              data.push(pdf(i, params[0], params[1]));
            }
        }
        break;

        case "exponential": {
            const pdf = stdlib.exponential.pdf;
            for (let i = bounds[0]; i <= bounds[1]; i += 0.05) {
              data.push(pdf(i, params[0]));
            }
        }
        break;
      }

      break;

    case "discrete":
      
      switch (dist) {

        case "binomial": {
          for (let i = bounds[0]; i <= bounds[1]; i += 1) {
            data.push(stdlib.binomial.pmf(i, Math.floor(params[0]), params[1]));
          }
        }
      }
    }
  return data;
}
