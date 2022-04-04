import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'
require('antd/dist/antd.less')
import '../styles/antd.less'
require('../styles/layout.less')

export const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
