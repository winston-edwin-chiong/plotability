import { Radio, Group, Select, NumberInput, Button } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { FC, useEffect } from 'react';
import { useState } from 'react';

interface DistributionTypeRadioProps {
    // Future props here
}


const DistributionTypeRadio: FC<DistributionTypeRadioProps> = () => {

    const [radioValue, setRadioValue] = useInputState<string>("all");
    const [selectOptions, setSelectOptions] = useState<any>([]);
    const [selectedDistribution, setSelectedDistribution] = useInputState<string | null>(null);
    const [parameters, setParameters] = useState<string[]>([]);
    // In the inputValues state, "scale" can still live on despite switching to a discrete distribution b/c it was never removed from the state hashmap
    const [inputValues, setInputValues] = useState<{ [key: string]: string | number }>({})
    const [plotData, setPlotData] = useState<number[]>([]);

    const handleInputChange = (parameter: string, value: string | number) => {
        setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [parameter]: value,
        }));
    };

    const handleButtonClick = () => {
        const fetchData = async () => {
            const queryParams = Object.entries(inputValues).map(([key, value]) => `${key}=${value}`).join('&');
            const response = await fetch(`http://127.0.0.1:5000/api/distributions/${selectedDistribution}/data?${queryParams}`);
            const result = await response.json();
            setPlotData(result)
            console.log(plotData)
        };

        fetchData();
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:5000/api/distributions?type=${radioValue}`);
            const result = await response.json();
            setSelectOptions(result);
        };

        fetchData();
    }, [radioValue]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:5000/api/distributions/${selectedDistribution}/parameters`);
            const result = await response.json();
            setParameters(result);
        };
        if (selectedDistribution) {
            fetchData();
        }
    }, [selectedDistribution]);

    return (
        <>
        <Radio.Group value={radioValue} onChange={setRadioValue}>
            <Group> 
                <Radio value="all" label="All" />
                <Radio value="continuous" label="Continuous" />
                <Radio value="discrete" label="Discrete" />
            </Group>
        </Radio.Group>
        <Select 
            placeholder="Select your favorite distribution!" 
            data={selectOptions} 
            onChange={setSelectedDistribution}
        />
        {parameters.map((parameter, index) => (
            <NumberInput key={index} label={parameter} onChange={(value) => handleInputChange(parameter, value)}/>
        ))}
        <NumberInput label="Left X Bound" onChange={(value) => handleInputChange('leftXBound', value)}/>
        <NumberInput label="Right X Bound" onChange={(value) => handleInputChange('rightXBound', value)}/>
        <Button variant='default' onClick={handleButtonClick}>Plot!</Button>
        <div>{plotData.join(" ")}</div>
        </>
    );
}

export default DistributionTypeRadio;
