import React from 'react';
import { CellsConverter } from '../../../helpers/cells-converter';
import { TextHelper } from '../../../helpers/text-helper';
import { CellProps } from '../../../types/default-props';
import Background from './background/background';
import styles from './splash.part.module.scss';

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
      <span id={styles.carret}>&gt;</span> Servus, I'm{' '}
      <span id={styles.heading}>Maurice el-Banna</span>,
    </h1>,
    <h1>
      a full stack developer {hCells < 40 && <br />}from{' '}
      <span className={styles.austriaColored}>Au</span>
      <span>str</span>
      <span className={styles.austriaColored}>ia</span>
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
