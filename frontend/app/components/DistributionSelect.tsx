import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from "@remix-run/react";
import { Select } from '@mantine/core';
import { FC } from 'react';

interface DistributionSelectProps {
    // Future props here
}

export const loader = async () => {
    const response = await fetch(`http://127.0.0.1:5000/api/distributions`);
    const result = await response.json();
    return result 
}

const DistributionSelect: FC<DistributionSelectProps> = () => {
    const data = useLoaderData<typeof loader>();
    
    return (
        <>
            <Select
            placeholder="Select your favorite distribution!"
            data={data}
            />
        </>
    );
}

export default DistributionSelect;