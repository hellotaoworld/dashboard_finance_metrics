import Head from 'next/head'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react'

export default function Home() {
  return (
    <main>
      <Head><title>Valuation Engine Dashboard</title>
        <link rel="icon" href="/avatar2.png" />
      </Head>
      <div className='my-3 mb-20'></div>
      <div className='grid grid-rows-1'>

        <div className='mx-2 my-2 text-3xl font-bold'>
          About Valuation Engine
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <Card className="max-w-[800px] mx-1 my-3">

              <CardBody>
                <div className='mx-1 my-1'>
                  <p className='mb-5'><b>Welcome to Valuation Engine,</b> a cutting-edge platform dedicated to providing in-depth financial analysis and health assessments of companies across various sectors. Our platform stands at the intersection of finance and technology, offering a unique blend of accuracy, efficiency, and user-friendly experience.
                  </p>
                  <p className='mb-2 text-default-500 font-bold'>🎯 Our Mission</p>
                  <p className='mb-5'>At Valuation Engine, we are committed to delivering precise and comprehensive financial evaluations to help investors, analysts, and business leaders make informed decisions. We believe in the power of data-driven insights to unveil the true financial standing of a company.</p>
                  <p className='mb-2 text-default-500 font-bold'>✨ How It Works</p>
                  <p className='mb-5'>Our innovative approach involves a meticulous extraction of financial statements directly from the Edgar database, the primary source for detailed financial information on a wide array of companies. We dive deep into these financial statements, calculating their key financial metrics and ratios. What sets us apart is our sector-based ranking system. By analyzing and comparing companies within their respective sectors, we offer a more nuanced and relative perspective on financial performance. This sector-specific analysis allows for a more accurate benchmarking, helping stakeholders understand a company&apos;s position in its industry landscape.</p>

                  <p className='mb-2 text-default-500 font-bold'>🧰 Technology at the Core</p>
                  <p className='mb-2'>The backbone of Valuation Engine is our robust tech stack:</p>
                  <li><span className='text-default-500'>Data Source: </span>
                    Edgar API (<Link isExternal showAnchorIcon href="https://www.sec.gov/edgar/sec-api-documentation">Documentation</Link>)
                  </li>
                  <li><span className='text-default-500'>Data Processing: </span>
                    Python</li>
                  <li><span className='text-default-500'>Database: </span>
                    MySQL Cloud Database</li>
                  <li><span className='text-default-500'>Application Framework: </span>
                    NextJS</li>
                </div>
              </CardBody>
            </Card></div>
          <div className='my-3'><img className="about_img" src='/about.png'></img></div>
        </div>


      </div >
    </main>
  )
}

