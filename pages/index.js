import Head from 'next/head'
import { getSectors } from '../services'

export default function Home({ sectors }) {
  return (
    <main>
      <Head><title>Valuation Engine Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </main>
  )
}

