import React from 'react';
import BorderBox from '../components/border-box/BorderBox';
import ConsoleContainer from '../components/console-container/ConsoleContainer';
import Padded from '../components/padded/padded';
import Heading from '../parts/heading/heading';
import Info from '../parts/info-part/info.part';
import Splash from '../parts/splash-part/splash.part';
import { CellProps } from '../types/default-props';

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
            <Splash
              vCells={verticalCellCount - 7 > 6 ? verticalCellCount - 7 : 6}
              hCells={horizontalCellCount - (disableSideLines ? 0 : 4)}
            />
            <Info
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
