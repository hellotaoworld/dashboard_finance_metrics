import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { VscTelescope, VscInfo, VscGraphLine, VscChevronRight, VscChevronLeft } from "react-icons/vsc";
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';

const Sidebar = () => {

    const [isCollapsedSidebar, setisCollapsedSidebar] = useState(false);
    const [SelectedSidebar, setSelectedSidebar] = useState(0);
    const { theme, setTheme } = useTheme()

    return (
        <div className='sidebar_wrapper'>
            <button className='sidebar_btn bg-default-200' onClick={(e) => { setisCollapsedSidebar((prev) => !prev); }}>
                {isCollapsedSidebar ? <VscChevronRight className='bg-default-200' /> : <VscChevronLeft className='bg-default-200' />}
            </button>
            <aside className='sidebar bg-default-100' data-collapse={isCollapsedSidebar}>
                <div className='sidebar_top'>
                    <Image className="sidebar_logo" src='/favicon.ico' width={15} height={15} alt="logo" />
                    <p className='sidebar_logo_name'>Valuation Engine</p>
                </div>
                <ul className='sidebar_list'>
                    <li className='sidebar_item'>
                        <Link href="/"
                            className={SelectedSidebar == 0 ? "sidebar_link text-default-900 bg-default-200" : "sidebar_link text-default-900 bg-default-primary-50"}
                            onClick={(e) => { setSelectedSidebar(0) }}>
                            <span className='sidebar_icon'><VscInfo /></span>
                            <span className='sidebar_name'>Home</span>
                        </Link>
                    </li>
                    <li className='sidebar_item'>
                        <Link href="/sector"
                            className={SelectedSidebar == 1 ? "sidebar_link text-default-900 bg-default-200" : "sidebar_link text-default-900 bg-default-primary-50"}
                            onClick={(e) => { setSelectedSidebar(1) }}>
                            <span className='sidebar_icon'><VscTelescope /></span>
                            <span className='sidebar_name'>Sector Overview</span>
                        </Link>
                    </li>
                    <li className='sidebar_item'>
                        <Link href="/company"
                            className={SelectedSidebar == 2 ? "sidebar_link text-default-900 bg-default-200" : "sidebar_link text-default-900 bg-default-primary-50"}
                            onClick={(e) => { setSelectedSidebar(2) }}>
                            <span className='sidebar_icon'><VscGraphLine /></span>
                            <span className='sidebar_name'>Company Profile</span>
                        </Link>
                    </li>
                </ul>

                <div className='sidebar_menu'>
                    <button className='theme_btn bg-default-200' onClick={() => { theme == 'light' ? setTheme('dark') : setTheme('light') }}>{setTheme == 'light' ? <BsFillMoonFill className='bg-default-200' /> : <BsSunFill className='bg-default-200' />}</button>

                </div>

            </aside>

        </div >

    )
}

export default Sidebar