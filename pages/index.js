import Head from 'next/head'
import Image from 'next/image'
import { getSectors } from '../services'
import { SectorComponent } from '@/components'



export default function Home({ sectors }) {
  return (
    <main>
      <div className='container mx-auto px-10 mb-8'>
        <Head><title>Valuation Engine Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SectorComponent sectors={sectors}></SectorComponent>

      </div>

    </main>
  )
}

export async function getServerSideProps() {
  const sectors = (await getSectors()) || [];

  return {
    props: { sectors }
  }
}