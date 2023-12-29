import React from 'react'
import { getSectors } from '../services';
import { Filter } from '@/components';
import { SectorMain } from '@/components';
import { useGlobalState } from '@/state';

const SectorPage = ({ sectors }) => {
    const sectorSelected = useGlobalState('Sector')[0];
    //console.log(sectorSelected)

    if (sectorSelected == "") {
        return (

            <div className='container grid grid-rows-subgrid gap-4 row-span-2'>
                <div>
                    <Filter sectors={sectors} status={0}></Filter>
                </div>
                <div>
                    Please select a sector
                </div>
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