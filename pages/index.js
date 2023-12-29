import Head from 'next/head'
import Image from 'next/image'
import { getSectors } from '../services'
import SectorPage from './sector'

export default function Home({ sectors }) {
  return (
    <main>
      <Head><title>Valuation Engine Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </main>
  )
}

export async function getServerSideProps() {
  const sectors = (await getSectors()) || [];

  return {
    props: { sectors }
  }
}