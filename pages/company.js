import React from 'react'
import Image from 'next/image';
import { getSectors } from '../services';
import { Filter } from '@/components';
import { useGlobalState } from '@/state';
import { CompanyMain } from '@/components';

const CompanyPage = ({ sectors }) => {
    const sectorSelected = useGlobalState('Sector')[0];
    const companySelected = useGlobalState('Company')[0];
    if (sectorSelected == "" | companySelected == "" | sectors == null) {
        return (

            <div className='container grid grid-rows-subgrid gap-4 row-span-2'>
                <div>
                    <Filter sectors={sectors}></Filter>
                </div>
                {/* <Image className="justify-self-center my-3" src="/missing_values.png" alt="missing value" width={500} height={500}></Image> */}
                <h2 className='justify-self-stretch mx-72 my-10 my-10 text-xl font-bold'>👆 &nbsp;To start, please select an industry and a company above </h2>
            </div >

        )


    }
    else {
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

}

export default CompanyPage

export async function getServerSideProps() {
    const sectors = (await getSectors()) || [];

    return {
        props: { sectors }
    }
}