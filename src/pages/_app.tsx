import { AppProps } from 'next/app'; 
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient'; 
import '../styles/globals.css';
import React from 'react';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
