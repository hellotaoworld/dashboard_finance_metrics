import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <Head><title>Valuation Engine Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container grid grid-rows-subgrid gap-4 row-span-2'>

        <h2 className='my-10 text-3xl font-medium'>Methodology</h2>

      </div >
    </main>
  )
}

