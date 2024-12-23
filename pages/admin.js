import React from 'react'
import Head from 'next/head';
import { AdminMain } from '@/components';
import { checkDatabaseConnection, getSectors } from '../services';
import { useGlobalState } from '@/state';
import Image from 'next/image';

const AdminPage = ({ env, sectors }) => {
    //const envSelected = useGlobalState('Env')[0];
    console.log(env)
    if (env == "connected") {
        return (
            <main>
                <Head><title>Valuation Engine</title>
                    <link rel="icon" href="/avatar2.png" />
                </Head>
                <div className='container grid grid-rows-subgrid gap-4 row-span-2'>

                    <div>
                        <AdminMain sectors={sectors}></AdminMain>
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

                    <Image className="justify-self-center my-3" src="/missing_values.png" alt="missing value" width={500} height={500}></Image>
                    <h2 className='justify-self-center my-10 text-3xl font-medium justify-self-center'>No Access </h2>

                </div >
            </main>
        )
    }
}

export default AdminPage

export async function getServerSideProps() {
    const env = (await checkDatabaseConnection()) || [];
    const sectors = (await getSectors()) || [];
    return {
        props: { env, sectors }
    }
}