import '@mantine/core/styles.css';
import distributions_data from './distributions_data.json';
import { MantineProvider, Button, Radio, Group, Select } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useState } from 'react';
import { Header, ContinuousChart, DiscreteChart, ParameterSettings } from './components';
import { getDistributionData } from './utils/calculations';
import { Data, Distribution } from './interfaces/interfaces';
import { validateDistribution } from './utils/validations';

/* Note that '0' is a valid parameter value for some distributions. */

export default function App() {
  
  const [distCategory, setdistCategory] = useInputState<string>("all");
  const [distFunction, setDistFunction] = useInputState<string>("pdf_pmf");
  const [distribution, setDistribution] = useState<Distribution>({ name: '', type: '', params: {}, });
  const [data, setData] = useState<Data>({ x: [], y: [] });
  const [chartType, setChartType] = useState<string | null>(null);
  const [numDistributions, setNumDistributions] = useState<number>(0);

  const handleDistributionChange = (value: string | null) => {
    if (!value || value === distribution.name) return;

    // Find the distribution parameters from the data.
    const type = distributions_data.distributions.find(dist => dist.value === value)?.type;
    const newParamsValues = distributions_data.distributions
      .find(dist => dist.value === value)?.params
      .reduce((o, key) => Object.assign(o, { [key]: '' }), {}) as { [key: string]: number | string };
    
    // Copy over values up to the length of the new distribution's parameters.
    const oldKeys = Object.keys(distribution.params);
    const newKeys = Object.keys(newParamsValues);
    for (let i = 0; i < newKeys.length; i++) {
      if (i < oldKeys.length) {
        newParamsValues[newKeys[i]] = distribution.params[oldKeys[i]]
      } else {
        newParamsValues[newKeys[i]] = '';
      } 
    }

    setDistribution({name: value, type: type as string, params: newParamsValues});
  }

  const handlePlotButtonClick = () => {
    const validationMessage = validateDistribution(distribution);
    if (validationMessage) { //TODO: Change this to add error states to the inputs and sliders.
      alert(validationMessage);
      return;
    }

    const data = getDistributionData(distribution, distFunction);
    setData(data);
    setChartType(distribution.type);
  }

  const handleParamChange = (value: number | string, parameter: string) => {
    const newParamsValues = {...distribution.params};
    newParamsValues[parameter] = value;
    setDistribution({ ...distribution, params: newParamsValues })
  }

  const handleSliderChangeEnd = (value: number | string, parameter: string) => {
    // The sliders also update the chart. This function is called when the user stops dragging the slider.
    const newParamsValues = {...distribution.params};
    newParamsValues[parameter] = value;
    const newDistribution = { ...distribution, params: newParamsValues }
    setDistribution(newDistribution);

    const validationMessage = validateDistribution(newDistribution);
    if (validationMessage) { //TODO: Change this to add error states to the inputs and sliders.
      console.log(validationMessage);
      return;
    }

    const data = getDistributionData(newDistribution, distFunction);
    setData(data);
    setChartType(distribution.type);
  }

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
      <Select
        placeholder="Select your favorite distribution!"
        data={distCategory === "all"
          ? distributions_data.distributions.sort((a, b) => a.label.localeCompare(b.label))
          : distributions_data.distributions.filter(dist => dist.type === distCategory).sort((a, b) => a.label.localeCompare(b.label))}
        value={distribution.name || ''}
        onChange={(value) => handleDistributionChange(value)}
        searchable={true}
        allowDeselect={false}
        clearable={true}
        nothingFoundMessage="No distribution found!"
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
        sliderOnChangeEnd={(handleSliderChangeEnd)}
      />
      <Button variant='default' onClick={() => handlePlotButtonClick()}>PLOT!</Button>
      {distribution.name && <Button variant='default' onClick={() => setNumDistributions(numDistributions + 1)}>+ ADD ANOTHER!</Button>}

      {/* Render state in the DOM for debugging */}
      <div style={{ marginTop: '20px' }}>
        <h3>Debug Information:</h3>
        <p><strong>Distribution Object:</strong> {JSON.stringify(distribution)}</p>
        <p><strong>Calculation Type: </strong>{distFunction}</p>
        <p><strong>Number of Distributions:</strong> {numDistributions}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
      {chartType === 'continuous' && <ContinuousChart data={data} />}
      {chartType === 'discrete' && <DiscreteChart data={data} />}
      </div>

    </MantineProvider>
  );
}
