import React from 'react'
import { Header } from './'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <footer></footer>
        </>
    )
}

export default Layout