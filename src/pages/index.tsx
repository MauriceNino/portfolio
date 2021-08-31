import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import HomePage from './home/home.page';

function getCurrentState() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    horizontalCellCount: Math.floor(width / 9.6),
    verticalCellCount: Math.floor(height / 21)
  };
}

const App = () => {
  // TODO: Get rid of the default state
  const [state, setState] = useState({
    horizontalCellCount: 10,
    verticalCellCount: 10
  });

  useEffect(() => {
    const handleResize = () => {
      const newState = getCurrentState();

      if (
        state.horizontalCellCount !== newState.horizontalCellCount ||
        state.verticalCellCount !== newState.verticalCellCount
      ) {
        setState(newState);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

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

      <HomePage
        vCells={state.verticalCellCount}
        hCells={state.horizontalCellCount}
      />
    </>
  );
};

export default App;
