import Padded from '../../components/padded/padded';
import { CellsConverter } from '../../helpers/cells-converter';
import { CellProps } from '../../types/default-props';
import AboutMe from './about-me/about-me';
import styles from './info.part.module.scss';
import Projects from './projects/projects';
import Skills from './skills/skills';

type InfoProps = CellProps;

const Info = (props: InfoProps) => {
  const hCells = props.hCells;
  const vCells = props.vCells;

  const maxCells = 130;

  const usingCells = hCells > maxCells ? maxCells : hCells;
  const marginLeft =
    hCells - usingCells > 0 ? Math.floor((hCells - usingCells) / 2) : 0;

  const isFullscreen = usingCells < 100;

  const leftCells = isFullscreen ? usingCells : Math.floor(usingCells / 3);
  const rightCells = isFullscreen ? usingCells : usingCells - leftCells;

  return (
    <div
      id="mainPage"
      className={styles.mainPage}
      style={{ minHeight: CellsConverter.cellsToHeight(vCells) }}
    >
      <div
        className={`${styles.flexContainer} ${isFullscreen ? styles.fs : ''}`}
        style={{
          width: CellsConverter.cellsToWidth(usingCells),
          marginLeft: CellsConverter.cellsToWidth(marginLeft)
        }}
      >
        <div style={{ width: CellsConverter.cellsToWidth(leftCells) }}>
          <Padded top={isFullscreen ? 1 : 5}>
            <Skills hCells={leftCells - 2} />
          </Padded>
        </div>
        <div style={{ width: CellsConverter.cellsToWidth(rightCells) }}>
          <Padded top={isFullscreen ? 1 : 5} left={isFullscreen ? 1 : 10}>
            <AboutMe isFullscreen={isFullscreen} />
          </Padded>
        </div>
      </div>

      <div
        style={{
          width: CellsConverter.cellsToWidth(usingCells),
          marginLeft: CellsConverter.cellsToWidth(marginLeft)
        }}
      >
        <Padded top={isFullscreen ? 1 : 5}>
          <Projects isFullscreen={isFullscreen} />
        </Padded>
      </div>
    </div>
  );
};

export default Info;
