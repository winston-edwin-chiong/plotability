import { Radio, Group } from '@mantine/core';
import { FC } from 'react';
import { Link, useNavigate } from '@remix-run/react';
import { useState } from 'react';

interface DistributionTypeRadioProps {
    // Future props here
}

const DistributionTypeRadio: FC<DistributionTypeRadioProps> = () => {
    const [value, setValue] = useState<string>("all");

    return (
        <Radio.Group value={value} onChange={setValue}>
            <Group>
                <Radio value="all" label="All" />
                <Radio value="continuous" label="Continuous" checked/>
                <Radio value="discrete" label="Discrete" />
            </Group>
        </Radio.Group>
    );
}

export default DistributionTypeRadio;