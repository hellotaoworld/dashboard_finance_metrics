import React, { useEffect } from 'react'
import { Header } from './'
import { Sidebar } from './'
import { ScrollShadow } from '@nextui-org/react'
import { setGlobalState } from '@/state'

const Layout = ({ children }) => {
    useEffect(() => {
        const path = window.location.pathname; // Pathname only
        const mapping = { '/': 0, '/sector': 1, '/company': 2 }
        setGlobalState('Tab', mapping[path])
    }, []);
    //console.log('render layout')
    return (
        <>

            <div className="layout">

                <Sidebar />
                <div className="keycontent">
                    <ScrollShadow className="w-[100%] h-[100vh]">
                        {children}
                    </ScrollShadow>
                </div>

            </div>

        </>
    )
}

export default Layout