import React from 'react'
import { getSectors } from '../services';
import { Filter } from '@/components';
import { SectorMain } from '@/components';
import { useGlobalState } from '@/state';
import Image from 'next/image';

const SectorPage = ({ sectors }) => {
    const sectorSelected = useGlobalState('Sector')[0];
    //console.log(sectorSelected)

    if (sectorSelected == "") {
        return (

            <div className='container grid grid-rows-subgrid gap-4 row-span-2'>
                <div>
                    <Filter sectors={sectors} status={0}></Filter>
                </div>
                <Image className="justify-self-center my-3" src="/missing_values.png" alt="missing value" width={500} height={500}></Image>
                <h2 className='justify-self-center my-10 text-3xl font-medium justify-self-center'>💬 To start, please select a sector from filter above </h2>

            </div >
        )

    }
    else {
        return (

            <div className='container grid grid-rows-subgrid gap-4 row-span-2'>
                <div>
                    <Filter sectors={sectors} status={1}></Filter>
                </div>
                <div>
                    <SectorMain sector={sectorSelected}></SectorMain>
                </div>
            </div >
        )
    }
}

export default SectorPage

export async function getServerSideProps() {
    const sectors = (await getSectors()) || [];
    return {
        props: { sectors }
    }
}