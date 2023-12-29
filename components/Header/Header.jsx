import React from 'react'
import Link from 'next/link'
import { useTheme } from "next-themes";

const Header = () => {
    const { theme, setTheme } = useTheme()
    return (
        <div className='container sticky top-0 w-full z-50 bg-sky-600 max-w-full border-b border-blue-500'>
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