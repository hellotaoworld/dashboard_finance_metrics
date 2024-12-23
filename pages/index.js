import Head from 'next/head'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react'
import { getCompanyPick } from '@/services';
import Pick from '@/components/Pick';
import Favourite from '@/components/Favourite';

export default function Home({ companypick }) {
  return (
    <main>
      <Head><title>Valuation Engine Dashboard</title>
        <link rel="icon" href="/avatar2.png" />
      </Head>
      <div className='my-3 mb-72'></div>
      <div className='grid grid-rows-1'>

        <div className='mx-2 my-2 text-3xl font-bold'>
          <div className='justify-self-center'>Valuation Engine</div>
          <Pick companies={companypick} />
        </div>
        <div className='my-3 mb-8'></div>
        <hr />
      </div >
    </main>
  )
}

export async function getServerSideProps() {
  const companypick = (await getCompanyPick()) || [];
  return {
    props: { companypick }
  }
}