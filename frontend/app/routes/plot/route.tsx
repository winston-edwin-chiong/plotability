import { useState, useEffect } from 'react';
import { Select } from '@mantine/core';
import DistributionSelect from '~/components/DistributionSelect';

export const loader = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/distributions?type=all');
    const result = await response.json();
    return result 
}

export default function Plot() {

    return (
        <>
            <div>Plot here!</div>
            <DistributionSelect />
        </>
    );
}
