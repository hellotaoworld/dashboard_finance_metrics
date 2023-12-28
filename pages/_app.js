//import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'

//import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect, useState } from 'react';
import { Layout } from '../components';

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} />

      </Layout>
    </NextUIProvider>


  )
}
