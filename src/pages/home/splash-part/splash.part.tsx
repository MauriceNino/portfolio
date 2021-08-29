import React from 'react';
import { CellsConverter } from '../../../helpers/cells-converter';
import { TextHelper } from '../../../helpers/text-helper';
import { CellProps } from '../../../types/default-props';
import Background from './background/background';
import styles from './splash.part.module.scss';

type Dot = { x: number; y: number };
type State = { map: string[][]; dots: Dot[] };

function onClick() {
  document.getElementById('mainPage')?.scrollIntoView({
    behavior: 'smooth'
  });
}

type SplashProps = CellProps;

const Splash = (props: SplashProps) => {
  const vCells = props.vCells;
  const hCells = props.hCells;

  const headerParts = [
    <h1>
      Servus, I'm <span style={{ color: '#ff80ff' }}>Maurice el-Banna</span>
    </h1>,
    <h1>
      I'm a full stack developer {hCells < 44 && <br />}from{' '}
      <span style={{ color: '#ed4e50' }}>Au</span>
      <span>str</span>
      <span style={{ color: '#ed4e50' }}>ia</span>
    </h1>,
    <br />,
    <div className={styles.button} onClick={onClick}>
      +------------+
      <br />| <div className={styles.downArrow}>&gt;</div> About Me |<br />
      +------------+
    </div>
  ];

  return (
    <>
      <div
        id={styles.splashContainer}
        style={{
          height: `${CellsConverter.cellsToHeight(vCells)}px`,
          width: `${CellsConverter.cellsToWidth(hCells)}px`
        }}
      >
        <div className={styles.content}>
          {TextHelper.centered(headerParts, vCells, hCells)}
        </div>

        <Background vCells={vCells} hCells={hCells} />
      </div>
    </>
  );
};

export default Splash;
