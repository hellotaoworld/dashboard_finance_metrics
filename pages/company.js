import React from 'react'
import { getSectors } from '../services';
import { Filter } from '@/components';
import { useGlobalState } from '@/state';
import { CompanyMain } from '@/components';

const CompanyPage = ({ sectors }) => {
    const sectorSelected = useGlobalState('Sector')[0];
    const companySelected = useGlobalState('Company')[0];

    return (

        <div className='container grid grid-rows-subgrid gap-4 row-span-2'>
            <div>
                <Filter sectors={sectors}></Filter>
            </div>
            <div>
                <CompanyMain sector={sectorSelected} company={companySelected}></CompanyMain>
            </div>
        </div >

    )

}

export default CompanyPage

export async function getServerSideProps() {
    const sectors = (await getSectors()) || [];

    return {
        props: { sectors }
    }
}