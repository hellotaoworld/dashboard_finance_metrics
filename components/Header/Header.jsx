import React from 'react'
import Link from 'next/link'

const Header = ({ sectors }) => {
    return (
        <div className='container px-4 py-2 pb-2 mb-2 sticky top-0 w-full z-50 bg-sky-600 max-w-full border-b border-blue-500'>
            <div className=''>
                <div>
                    <Link href="/">
                        <span className='mt-2 ml-2 cursor-pointer font-bold md:text-2xl text-white text-xl'>Valuation Engine Dashboard</span>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default Header