import React from 'react'
import { Header } from './'
import { Sidebar } from './'
import { ScrollShadow } from '@nextui-org/react'

const Layout = ({ children }) => {
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