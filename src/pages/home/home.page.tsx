import React from 'react';
import BorderBox from '../../components/border-box/BorderBox';
import ConsoleContainer from '../../components/console-container/ConsoleContainer';
import Padded from '../../components/padded/padded';
import { CellProps } from '../../types/default-props';
import Heading from './heading/heading';
import MainPage from './info-part/info.part';
import SplashPage from './splash-part/splash.part';

type HomePageProps = CellProps;

const HomePage = (props: HomePageProps) => {
  const horizontalCellCount = props.hCells;
  const verticalCellCount = props.vCells;

  const disableSideLines = horizontalCellCount < 50;

  return (
    <ConsoleContainer
      vCells={verticalCellCount}
      hCells={horizontalCellCount}
      showDimensions={false}
    >
      <Padded bottom={0}>
        <Heading hCells={horizontalCellCount} />
      </Padded>

      <Padded
        left={disableSideLines ? 0 : 1}
        right={disableSideLines ? 0 : 1}
        bottom={0}
      >
        <BorderBox
          vCells={verticalCellCount - 7}
          hCells={horizontalCellCount - (disableSideLines ? 0 : 2)}
          minVCells={6}
          disableSideLines={disableSideLines}
        >
          <div id="scrollable-content">
            <SplashPage
              vCells={verticalCellCount - 7 > 6 ? verticalCellCount - 7 : 6}
              hCells={horizontalCellCount - (disableSideLines ? 0 : 4)}
            />
            <MainPage
              vCells={verticalCellCount - 7 > 6 ? verticalCellCount - 7 : 6}
              hCells={horizontalCellCount - (disableSideLines ? 0 : 4)}
            />
          </div>
        </BorderBox>
      </Padded>

      <Padded top={0} bottom={0}>
        <div id="copyright">©2021 - Maurice el-Banna</div>
      </Padded>
    </ConsoleContainer>
  );
};

export default HomePage;