import Head from 'next/head';
import React from 'react'
import { getSectors } from '../services';
import { Filter } from '@/components';
import { useGlobalState } from '@/state';
import { CompanyMain } from '@/components';

const CompanyPage = ({ sectors }) => {
    const sectorSelected = useGlobalState('Sector')[0];
    const companySelected = useGlobalState('Company')[0];
    if (sectorSelected == "" || companySelected == "" || sectors == null) {
        return (
            <main>
                <Head><title>Valuation Engine</title>
                    <link rel="icon" href="/avatar2.png" />
                </Head>
                <div className='container grid grid-rows-subgrid gap-4 row-span-2'>
                    <div>
                        <Filter sectors={sectors}></Filter>
                    </div>
                    <div className="flex justify-center mt-14">
                        <div className="flex items-start gap-0">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center" style={{ opacity: sectorSelected ? 1 : 1 }}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${sectorSelected ? 'bg-green-500 text-white' : 'bg-blue-600 text-white shadow-md'}`}>
                                    {sectorSelected ? '✓' : '1'}
                                </div>
                                <div className="mt-3 text-center max-w-[160px]">
                                    <p className={`font-semibold ${sectorSelected ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100'}`}>Pick a Sector</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Choose an industry from the dropdown</p>
                                </div>
                            </div>
                            <div className="flex items-center mt-4 mx-6 text-gray-300 dark:text-gray-600 text-2xl">→</div>
                            {/* Step 2 */}
                            <div className={`flex flex-col items-center ${!sectorSelected ? 'opacity-35' : ''}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${sectorSelected ? 'bg-blue-600 text-white shadow-md' : 'border-2 border-gray-300 dark:border-gray-600 text-gray-400'}`}>2</div>
                                <div className="mt-3 text-center max-w-[160px]">
                                    <p className={`font-semibold ${sectorSelected ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}`}>Pick a Company</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select a company from the filtered list</p>
                                </div>
                            </div>
                            <div className="flex items-center mt-4 mx-6 text-gray-300 dark:text-gray-600 text-2xl">→</div>
                            {/* Step 3 */}
                            <div className="flex flex-col items-center opacity-35">
                                <div className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-400 flex items-center justify-center font-bold text-lg">3</div>
                                <div className="mt-3 text-center max-w-[160px]">
                                    <p className="font-semibold text-gray-400 dark:text-gray-500">Analyze</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">View metrics, charts, rankings and notes</p>
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
                        <Filter sectors={sectors}></Filter>
                    </div>
                    <div>
                        <CompanyMain sector={sectorSelected} company={companySelected}></CompanyMain>
                    </div>
                </div >
            </main>
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