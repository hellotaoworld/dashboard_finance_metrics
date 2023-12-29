import React from 'react'
import { getSectors } from '../services';
import { Filter } from '@/components';
import { useGlobalState } from '@/state';

const CompanyPage = ({ sectors }) => {

    return (
        <div className='container'>
            <Filter sectors={sectors}></Filter>
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