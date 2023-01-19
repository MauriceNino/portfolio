import { FC } from 'react';
import { Container } from '../../components/container/container';
import { CellsConverter } from '../../helpers/cells-converter';
import { useContainerCells } from '../../hooks/containerCells';
import { AboutMe } from './about-me/about-me';
import styles from './info.part.module.scss';
import { Projects } from './projects/projects';
import { Skills } from './skills/skills';

const MAX_WIDTH_CELLS = 130;

export const Info: FC = () => {
  const { hCells, vCells } = useContainerCells();

  const usingCells = Math.min(MAX_WIDTH_CELLS, hCells);
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
          <Container
            dimensions={{
              hCells: leftCells
            }}
            heightUnset
            padding={{
              top: isFullscreen ? 1 : 5,
              left: 1,
              right: 1,
              bottom: 1
            }}
          >
            <Skills />
          </Container>
        </div>
        <div style={{ width: CellsConverter.cellsToWidth(rightCells) }}>
          <Container
            dimensions={{
              hCells: rightCells
            }}
            heightUnset
            padding={{
              top: isFullscreen ? 1 : 5,
              left: isFullscreen ? 1 : 7,
              right: 1,
              bottom: 1
            }}
          >
            <AboutMe isFullscreen={isFullscreen} />
          </Container>
        </div>
      </div>

      <div
        style={{
          width: CellsConverter.cellsToWidth(usingCells),
          marginLeft: CellsConverter.cellsToWidth(marginLeft)
        }}
      >
        <Container
          dimensions={{
            hCells: usingCells
          }}
          heightUnset
          padding={{
            top: isFullscreen ? 1 : 5,
            left: 1,
            right: 1,
            bottom: 1
          }}
        >
          <Projects isFullscreen={isFullscreen} />
        </Container>
      </div>
    </div>
  );
};
