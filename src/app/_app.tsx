// pages/_app.tsx

import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = React.useRef<QueryClient>()

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
