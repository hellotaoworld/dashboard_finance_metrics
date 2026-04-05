import Head from 'next/head'
import React from 'react'
import { getSectors } from '../services';
import { Filter } from '@/components';
import { SectorMain } from '@/components';
import { useGlobalState } from '@/state';

const SectorPage = ({ sectors }) => {
    const sectorSelected = useGlobalState('Sector')[0];

    if (sectorSelected == "" || sectors == null) {
        return (
            <main>
                <Head><title>Valuation Engine</title>
                    <link rel="icon" href="/avatar2.png" />
                </Head>
                <div className='container grid grid-rows-subgrid gap-4 row-span-2'>
                    <div>
                        <Filter sectors={sectors} status={0}></Filter>
                    </div>
                    <div className="flex justify-center mt-14">
                        <div className="flex items-start gap-0">
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">1</div>
                                <div className="mt-3 text-center max-w-[180px]">
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">Pick a Sector</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Choose an industry from the dropdown above</p>
                                </div>
                            </div>
                            <div className="flex items-center mt-4 mx-6 text-gray-300 dark:text-gray-600 text-2xl">→</div>
                            <div className="flex flex-col items-center opacity-35">
                                <div className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-400 flex items-center justify-center font-bold text-lg">2</div>
                                <div className="mt-3 text-center max-w-[180px]">
                                    <p className="font-semibold text-gray-400 dark:text-gray-500">Explore Metrics</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">View sector averages, trends and rankings</p>
                                </div>
                            </div>
                        </div>
                    </div>

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