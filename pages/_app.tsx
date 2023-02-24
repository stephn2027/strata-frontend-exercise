import type { AppProps } from 'next/app';
import AppContext from '../components/AppContext';
import { useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState();

  return (
    <AppContext.Provider value={{ session, setSession }}>
      <div className=" min-h-screen">
        <Component {...pageProps} />
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
