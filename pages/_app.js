//import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes';

//import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect, useState } from 'react';
import { Layout } from '../components';

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Layout>
          <Component {...pageProps} />

        </Layout>
      </NextThemesProvider>
    </NextUIProvider>


  )
}
