import '@mantine/core/styles.css';
import distributions_data from './distributions_data.json';
import { MantineProvider, Button, Radio, Group, Select, NumberInput, Slider, Stack } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useState } from 'react';
import ContinuousChart from './components/ContinuousChart';
import { getDistributionData } from './utils/calculations';
import { Data, Distribution } from './interfaces/interfaces';


export default function App() {

  const [radioValue, setRadioValue] = useInputState<string>("all");
  const [distribution, setDistribution] = useState<Distribution>({ name: '', type: '', params: [] });
  const [data, setData] = useState<Data>({ x: [], y: [] });
  const [bounds, setBounds] = useState<(number | string)[]>(['', '']);

  const handleDistributionChange = (value: string | null) => {
    const type = distributions_data.distributions.find(dist => dist.value === value)?.type;
    const newParamsValues = distributions_data.distributions
      .find(dist => dist.value === value)?.params
      .map((_, index) => distribution.params[index] || distribution.params[index] === 0 ? distribution.params[index] : ''); // 0 is a valid parameter value. 
    value && newParamsValues && setDistribution({ name: value, type: type as string, params: newParamsValues as (number | string)[] });
  }

  const handlePlotButtonClick = () => {
    const y = getDistributionData(distribution.name, distribution.type, distribution.params as number[], bounds as number[]);
    const x = [...bounds] as number[];
    setData({ x: x, y: y });
    console.log(data);
  }

  const handleParamChange = (value: number | string, index: number) => {
    const newParamsValues = [...distribution.params];
    newParamsValues[index] = value;
    setDistribution({ ...distribution, params: newParamsValues })
  }

  const handleSliderChange = (value: number | string, index: number) => {
    const newParamsValues = [...distribution.params];
    newParamsValues[index] = value;
    setDistribution({ ...distribution, params: newParamsValues })

    const y = getDistributionData(distribution.name, distribution.type, newParamsValues as number[], bounds as number[]);
    const x = [...bounds] as number[];
    setData({ x: x, y: y });
  }

  const handleBoundsChange = (value: number | string, index: number) => {
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
          ? distributions_data.distributions.sort((a, b) => a.label.localeCompare(b.label))
          : distributions_data.distributions.filter(dist => dist.type === radioValue).sort((a, b) => a.label.localeCompare(b.label))}
        value={distribution.name || ''}
        onChange={(value) => handleDistributionChange(value)}
        searchable={true}
        allowDeselect={false}
        clearable={true}
        nothingFoundMessage="No distribution found!"
      />
      {distributions_data.distributions.find(dist => dist.value === distribution.name)?.params.map((parameter, index) => (
        <Stack key={index}>
          <NumberInput
            value={distribution.params[index] || distribution.params[index] === 0 ? distribution.params[index] : ''}
            label={parameter}
            onChange={(value) => handleParamChange(value, index)}
          />
          <Slider
            value={(distribution.params[index] || distribution.params[index] === 0 ? distribution.params[index] : undefined) as number}
            onChange={(value) => handleSliderChange(value, index)}
          />
        </Stack>
      ))}
      <NumberInput label="Left Bound" onChange={(value) => handleBoundsChange(value, 0)} />
      <NumberInput label="Right Bound" key="right" onChange={(value) => handleBoundsChange(value, 1)} />
      <Button variant='default' onClick={() => handlePlotButtonClick()}>PLOT!</Button>

      {/* Render state in the DOM for debugging */}
      <div style={{ marginTop: '20px' }}>
        <h3>Debug Information:</h3>
        <p><strong>Selected Distribution:</strong> {distribution.name} && {distribution.type}</p>
        <p><strong>Params Values:</strong> {JSON.stringify(distribution.params)}</p>
        <p><strong>Bounds Values:</strong> {JSON.stringify(bounds)}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <ContinuousChart data={data.y} bounds={data.x} />
      </div>

    </MantineProvider>
  </>
}
