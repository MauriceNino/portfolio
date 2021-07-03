import React, { useEffect, useState } from 'react';
import BorderBox from '../components/border-box/BorderBox';
import ConsoleContainer from '../components/console-container/ConsoleContainer';
import Heading from '../components/heading/heading';
import SplashPage from '../components/splash/splash';
import Padded from '../components/padded/padded';
import MainPage from '../components/main/main';
import Head from 'next/head'

function getCurrentState() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    horizontalCellCount: Math.floor(width / 9.6),
    verticalCellCount: Math.floor(height / 21)
  } 
}

export default function App() {
  const [state, setState] = useState({horizontalCellCount: 10, verticalCellCount: 10});


  useEffect(() => {
    const handleResize = () => {
      const newState = getCurrentState();
  
  
      if(state.horizontalCellCount !== newState.horizontalCellCount
        || state.verticalCellCount !== newState.verticalCellCount) {
        setState(newState);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  })

  const horizontalCellCount = state.horizontalCellCount;
  const verticalCellCount = state.verticalCellCount;

  const disableSideLines = horizontalCellCount < 50;

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
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono" rel="stylesheet" />

      <link rel="apple-touch-icon" href="logo192.png" />
      <link rel="manifest" href="manifest.json" />
    </Head>
    <ConsoleContainer vCells={verticalCellCount} hCells={horizontalCellCount} showDimensions={false}>
      <Padded bottom={0}>
        <Heading hCells={horizontalCellCount}/>
      </Padded>

      <Padded left={disableSideLines ? 0 : 1} right={disableSideLines ? 0 : 1} bottom={0}>
        <BorderBox vCells={verticalCellCount - 7} hCells={horizontalCellCount - (disableSideLines ? 0 : 2)} minVCells={6} disableSideLines={disableSideLines}>
          <div id="scrollable-content">
            <SplashPage vCells={verticalCellCount - 7 > 6 ? verticalCellCount - 7 : 6} hCells={horizontalCellCount - (disableSideLines ? 0 : 4)}/>
            <MainPage vCells={verticalCellCount - 7 > 6 ? verticalCellCount - 7 : 6} hCells={horizontalCellCount - (disableSideLines ? 0 : 4)}/>
          </div>
        </BorderBox>
      </Padded>

      <Padded top={0} bottom={0}>
        <div id="copyright">©2021 - Maurice el-Banna</div>
      </Padded>
    </ConsoleContainer>
    </>
  );
}
