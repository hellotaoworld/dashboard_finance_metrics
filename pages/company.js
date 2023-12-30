import React from 'react'
import { getSectors } from '../services';
import { Filter } from '@/components';
import { useGlobalState } from '@/state';
import { CompanyMain } from '@/components';

const CompanyPage = ({ sectors }) => {
    const companySelected = useGlobalState('Company')[0];

    return (

        <div className='container grid grid-rows-subgrid gap-4 row-span-2'>
            <div>
                <Filter sectors={sectors}></Filter>
            </div>
            <div>
                <CompanyMain company={companySelected}></CompanyMain>
            </div>
        </div >

    )

}

export default CompanyPage

export async function getServerSideProps() {
    const sectors = (await getSectors()) || [];
    //const companies = (await getCompanies()) || [];

    return {
        props: { sectors }
    }
}