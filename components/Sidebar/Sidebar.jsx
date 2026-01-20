import React, { memo, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { VscTelescope, VscInfo, VscGraphLine, VscChevronRight, VscChevronLeft, VscLock, VscHome, VscQuestion } from "react-icons/vsc";
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import { useGlobalState, setGlobalState } from '@/state';

const Sidebar = () => {
    const [isCollapsedSidebar, setisCollapsedSidebar] = useState(false);
    const { theme, setTheme } = useTheme();
    const path = typeof window !== 'undefined' ? window.location.pathname : undefined;
    const mapping = { '/': 0, '/sector': 1, '/company': 2, '/admin': 3 }
    const tabSelected = useGlobalState('Tab')[0];

    // Auto-collapse on small screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) { // lg breakpoint
                setisCollapsedSidebar(true);
            }
        };

        handleResize(); // Check on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='sidebar_wrapper'>
            <button
                className='sidebar_btn bg-default-200 hover:bg-default-300 transition-colors duration-200'
                onClick={(e) => { setisCollapsedSidebar((prev) => !prev); }}
                aria-label={isCollapsedSidebar ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsedSidebar ? <VscChevronRight className='bg-default-200' /> : <VscChevronLeft className='bg-default-200' />}
            </button>
            <aside className='sidebar bg-white dark:bg-default-100 shadow-lg' data-collapse={isCollapsedSidebar}>
                <div className='sidebar_top py-6 px-4'>
                    <div className="flex items-center space-x-3">
                        <img
                            className="sidebar_logo w-12 h-12 rounded-full"
                            src='/avatar2.png'
                            alt="logo"
                        />
                        <p className='sidebar_logo_name text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent'>
                            Valuation Engine
                        </p>
                    </div>
                </div>

                <nav className='px-3 py-4'>
                    <ul className='sidebar_list space-y-2'>
                        <li className='sidebar_item'>
                            <Link href="/"
                                className={tabSelected == 0
                                    ? "sidebar_link flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium transition-all duration-200"
                                    : "sidebar_link flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-default-200 transition-all duration-200"}
                                onClick={(e) => { setGlobalState('Tab', 0) }}
                                title="Home"
                            >
                                <span className='sidebar_icon text-xl'><VscHome /></span>
                                <span className='sidebar_name'>Home</span>
                            </Link>
                        </li>
                        <li className='sidebar_item'>
                            <Link href="/sector"
                                className={tabSelected == 1
                                    ? "sidebar_link flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium transition-all duration-200"
                                    : "sidebar_link flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-default-200 transition-all duration-200"}
                                onClick={(e) => { setGlobalState('Tab', 1) }}
                                title="Industry Overview"
                            >
                                <span className='sidebar_icon text-xl'><VscTelescope /></span>
                                <span className='sidebar_name'>Industry Overview</span>
                            </Link>
                        </li>
                        <li className='sidebar_item'>
                            <Link href="/company"
                                className={tabSelected == 2
                                    ? "sidebar_link flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium transition-all duration-200"
                                    : "sidebar_link flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-default-200 transition-all duration-200"}
                                onClick={(e) => { setGlobalState('Tab', 2) }}
                                title="Company Profile"
                            >
                                <span className='sidebar_icon text-xl'><VscGraphLine /></span>
                                <span className='sidebar_name'>Company Profile</span>
                            </Link>
                        </li>
                        <li className='sidebar_item'>
                            <Link href="/about"
                                className={tabSelected == 4
                                    ? "sidebar_link flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium transition-all duration-200"
                                    : "sidebar_link flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-default-200 transition-all duration-200"}
                                onClick={(e) => { setGlobalState('Tab', 4) }}
                                title="About Us"
                            >
                                <span className='sidebar_icon text-xl'><VscQuestion /></span>
                                <span className='sidebar_name'>About Us</span>
                            </Link>
                        </li>
                        <li className='sidebar_item'>
                            <Link href="/admin"
                                className={tabSelected == 3
                                    ? "sidebar_link flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium transition-all duration-200"
                                    : "sidebar_link flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-default-200 transition-all duration-200"}
                                onClick={(e) => { setGlobalState('Tab', 3) }}
                                title="Local Admin"
                            >
                                <span className='sidebar_icon text-xl'><VscLock /></span>
                                <span className='sidebar_name'>Local Admin</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className='sidebar_menu mt-auto p-4 border-t border-gray-200 dark:border-gray-700'>
                    <button
                        className='w-full flex items-center justify-center gap-2 p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200'
                        onClick={() => { theme == 'light' ? setTheme('dark') : setTheme('light') }}
                        title={theme == 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        <span className="text-xl">{theme == 'dark' ? <BsSunFill /> : <BsFillMoonFill />}</span>
                        <span className="sidebar_name text-sm font-medium">
                            {theme == 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </button>
                </div>

            </aside>
        </div>
    )
}

export default memo(Sidebar)