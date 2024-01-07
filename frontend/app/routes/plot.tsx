import DistributionTypeRadio from '~/components/DistributionTypeRadio';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { useLoaderData } from "@remix-run/react";
import { Select } from '@mantine/core';

export const loader = async ({ }: LoaderFunctionArgs) => {
    const response = await fetch(`http://127.0.0.1:5000/api/distributions`);
    const result = await response.json();
    return result 
}

export default function Plot() {
    
    return (
        <>
            <DistributionTypeRadio />
            <DistributionSelect />
        </>
    );
}

function DistributionSelect() {
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