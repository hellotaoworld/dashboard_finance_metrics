import Head from 'next/head'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react'
import { getCompanyPick } from '@/services';
import Pick from '@/components/Pick';
import Favourite from '@/components/Favourite';

export default function Home({ companypick }) {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Head>
        <title>Valuation Engine</title>
        <link rel="icon" href="/avatar2.png" />
      </Head>

      {/* Enhanced Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Valuation Engine
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
            Comprehensive Financial Analysis at Your Fingertips
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Search any company to view quarterly financial metrics, industry comparisons,
            and detailed financial profiles powered by advanced analytics
          </p>

          {/* Search Component */}
          <Pick companies={companypick} />

          {/* Feature Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Industry Overview</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Compare sectors and identify market trends across different industries
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Company Profiles</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Deep dive into comprehensive financial metrics and performance indicators
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Quarterly Data</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Access quarterly market information and financial data sourced from SEC
              </p>
            </div>
          </div>

          {/* Additional Benefits Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Valuation Engine?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Accurate Valuations</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Industry-leading algorithms for precise company valuations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Comprehensive Data</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Access to thousands of companies and financial metrics</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Easy to Use</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Intuitive interface designed for both professionals and beginners</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Regular Updates</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Data refreshed quarterly to ensure you have the latest information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-200 dark:border-gray-700" />
    </main>
  )
}

export async function getServerSideProps() {
  const companypick = (await getCompanyPick()) || [];
  return {
    props: { companypick }
  }
}