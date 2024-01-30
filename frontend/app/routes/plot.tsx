import DistributionTypeRadio from '~/components/DistributionTypeRadio';
import DistributionSelect from '~/components/DistributionSelect';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ }: LoaderFunctionArgs) => {
    const response = await fetch(`http://127.0.0.1:5000/api/distributions`);
    const result = await response.json();
    return result 
}

export default function Plot() {
    
    return (
        <>
            <DistributionTypeRadio />
        </>
    );
}
