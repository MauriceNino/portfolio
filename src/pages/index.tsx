import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { CellProps } from '../types/default-props';
import HomePage from './home/home.page';

const getCurrentState = (): CellProps => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    hCells: Math.floor(width / 9.6),
    vCells: Math.floor(height / 21)
  };
};

const App = () => {
  const [state, setState] = useState<CellProps>({
    hCells: 50,
    vCells: 20
  });

  useEffect(() => {
    setState(getCurrentState());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newState = getCurrentState();

      if (
        state.hCells !== newState.hCells ||
        state.vCells !== newState.vCells
      ) {
        setState(newState);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [state]);

  return (
    <>
      <Head>
        <title>Maurice el-Banna</title>
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Servus, I'm Maurice el-Banna, I'm a full stack developer from Austria"
        />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono"
          rel="stylesheet"
        />

        <link rel="apple-touch-icon" href="logo192.png" />
        <link rel="manifest" href="manifest.json" />
      </Head>

      <HomePage vCells={state.vCells} hCells={state.hCells} />
    </>
  );
};

export default App;
