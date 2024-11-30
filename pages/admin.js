import React from 'react'
import { AdminMain } from '@/components';
import { checkDatabaseConnection } from '../services';
import { useGlobalState } from '@/state';
import Image from 'next/image';

const AdminPage = (env) => {
    //const envSelected = useGlobalState('Env')[0];
    //console.log(env.env)
    if (env.env == "disconnected") {
        return (

            <div className='container grid grid-rows-subgrid gap-4 row-span-2'>

                <Image className="justify-self-center my-3" src="/missing_values.png" alt="missing value" width={500} height={500}></Image>
                <h2 className='justify-self-center my-10 text-3xl font-medium justify-self-center'>No Access </h2>

            </div >
        )

    }
    else {
        return (

            <div className='container grid grid-rows-subgrid gap-4 row-span-2'>

                <div>
                    <AdminMain></AdminMain>
                </div>
            </div >
        )
    }
}

export default AdminPage

export async function getServerSideProps() {
    const env = (await checkDatabaseConnection()) || [];
    return {
        props: { env }
    }
}