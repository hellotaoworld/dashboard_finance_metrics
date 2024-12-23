import Head from 'next/head'
import React from 'react'
import { getSectors } from '../services';
import { Filter } from '@/components';
import { SectorMain } from '@/components';
import { useGlobalState } from '@/state';
import Image from 'next/image';

const SectorPage = ({ sectors }) => {
    const sectorSelected = useGlobalState('Sector')[0];
    //console.log(sectorSelected)

    if (sectorSelected == "" | sectors == null) {
        return (
            <main>
                <Head><title>Valuation Engine</title>
                    <link rel="icon" href="/avatar2.png" />
                </Head>
                <div className='container grid grid-rows-subgrid gap-4 row-span-2'>
                    <div>
                        <Filter sectors={sectors} status={0}></Filter>
                    </div>
                    {/* <Image className="justify-self-center my-3" src="/missing_values.png" alt="missing value" width={500} height={500}></Image> */}
                    <h2 className='justify-self-stretch mx-72 my-10 text-xl font-bold'>👆 &nbsp;To start, please select an industry above </h2>

                </div >


            </main>

        )

    }
    else {
        return (
            <main>
                <Head><title>Valuation Engine</title>
                    <link rel="icon" href="/avatar2.png" />
                </Head>
                <div className='container grid grid-rows-subgrid gap-4 row-span-2'>
                    <div>
                        <Filter sectors={sectors} status={1}></Filter>
                    </div>
                    <div>
                        <SectorMain sector={sectorSelected}></SectorMain>
                    </div>
                </div >
            </main>

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