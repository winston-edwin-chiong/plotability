import { useLoaderData } from "@remix-run/react";
import { Select } from '@mantine/core';

export default function DistributionSelect() {
    const data: string[] = useLoaderData();

    return (
        <Select
          placeholder="Select your favorite distribution!"
          data={data}
        />
    );
}