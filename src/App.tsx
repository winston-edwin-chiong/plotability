import '@mantine/core/styles.css';
import distributions_data from './distributions_data.json';
import { MantineProvider, Button, Radio, Group, Select, NumberInput, Slider, Stack } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useState } from 'react';
import ContinuousChart from './components/ContinuousChart';
import { getDistributionData} from './utils/calculations';
import { Data, Distribution } from './interfaces/interfaces';


export default function App() {

  const [radioValue, setRadioValue] = useInputState<string>("all");
  const [distribution, setDistribution] = useInputState<Distribution>({ name: '', type: '', params: []});
  const [selectedDistribution, setSelectedDistribution] = useInputState<string[]>(['', '']);
  const [paramsValues, setParamsValues] = useState<(number | string)[]>([]);
  const [data, setData] = useState<Data>({ x: [], y: [] });
  const [bounds, setBounds] = useState<(number | string)[]>(['', '']);

  const handleDistributionChange = (value: string | null) => {
    const type = distributions_data.distributions.find(dist => dist.value === value)?.type;
    console.log("Type is: ", type);  
    value && setSelectedDistribution([value, type as string]);
    const newParamsValues = distributions_data.distributions
      .find(dist => dist.value === value)?.params
      .map((_, index) => paramsValues[index] || paramsValues[index] === 0 ? paramsValues[index] : ''); // 0 is a valid parameter value. 
    newParamsValues && setParamsValues(newParamsValues as (number | string)[]);
  }

  const handlePlotButtonClick = () => {
    const y = getDistributionData(selectedDistribution[0], selectedDistribution[1], paramsValues as number[], bounds as number[]);
    const x = [...bounds] as number[];
    setData({ x, y });
    console.log(data);
  }

  const handleParamChange = (value: number | string, index: number) => {
    const newParamsValues = [...paramsValues];
    newParamsValues[index] = value;
    setParamsValues(newParamsValues);
  }

  const handleSliderChange = (value: number | string, index: number) => {
    const newParamsValues = [...paramsValues];
    newParamsValues[index] = value;
    setParamsValues(newParamsValues);
    const y = getDistributionData(selectedDistribution[0], selectedDistribution[1], newParamsValues as number[], bounds as number[]);
    const x = [...bounds] as number[];
    setData({ x, y });
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
        value={selectedDistribution[0] || ''}
        onChange={(value) => handleDistributionChange(value)}
        searchable={true}
        allowDeselect={false}
        clearable={true}
        nothingFoundMessage="No distribution found!"
      />
      {distributions_data.distributions.find(dist => dist.value === selectedDistribution[0])?.params.map((parameter, index) => (
        <Stack key={index}>
          <NumberInput
            value={paramsValues[index] || paramsValues[index] === 0 ? paramsValues[index] : ''}
            label={parameter}
            onChange={(value) => handleParamChange(value, index)}
          />
          <Slider
            value={(paramsValues[index] || paramsValues[index] === 0 ? paramsValues[index] : undefined) as number}
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
        <p><strong>Selected Distribution:</strong> {selectedDistribution[0]} && {selectedDistribution[1]}</p>
        <p><strong>Params Values:</strong> {JSON.stringify(paramsValues)}</p>
        <p><strong>Bounds Values:</strong> {JSON.stringify(bounds)}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <ContinuousChart data={data.y} bounds={data.x} />
      </div>

    </MantineProvider>
  </>
}
