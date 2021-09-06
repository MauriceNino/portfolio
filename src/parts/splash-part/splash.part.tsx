import { useTranslation } from 'next-i18next';
import React from 'react';
import BorderBox from '../../components/border-box/BorderBox';
import Centered from '../../components/centered/centered';
import { CellsConverter } from '../../helpers/cells-converter';
import { CellProps } from '../../types/default-props';
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

  const { t } = useTranslation();

  const btn_text = t('splash.scroll_button');

  const heading_big = (
    <>
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        <span>
          <span id={styles.carret}>&gt;</span> Servus, I'm{' '}
          <span id={styles.heading}>Maurice el-Banna</span>,
        </span>
      </Centered>
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        <span>
          a full stack developer from{' '}
          <span className={styles.austriaColored}>Au</span>
          str
          <span className={styles.austriaColored}>ia</span>
        </span>
      </Centered>
    </>
  );
  const heading_small = (
    <>
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        <span>
          <span id={styles.carret}>&gt;</span> Servus,
        </span>
      </Centered>
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        <span>
          I'm <span id={styles.heading}>Maurice el-Banna</span>,
        </span>
      </Centered>
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        <span>a full stack developer</span>
      </Centered>
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        <span>
          from <span className={styles.austriaColored}>Au</span>
          str
          <span className={styles.austriaColored}>ia</span>
        </span>
      </Centered>
    </>
  );

  return (
    <>
      <div
        id={styles.splashContainer}
        style={{
          height: `${CellsConverter.cellsToHeight(vCells)}px`,
          width: `${CellsConverter.cellsToWidth(hCells)}px`
        }}
      >
        <Centered
          vCells={vCells}
          hCells={hCells}
          vertical={true}
          absolute={true}
        >
          <div id={styles.centeredContent}>
            <h1>{hCells > 40 ? heading_big : heading_small}</h1>

            <Centered vCells={vCells} hCells={hCells} horizontal={true}>
              <div className={styles.button} onClick={onClick}>
                <BorderBox hCells={btn_text.length + 6} vCells={1}>
                  &nbsp;<div className={styles.downArrow}>&gt;</div> {btn_text}
                </BorderBox>
              </div>
            </Centered>
          </div>
        </Centered>

        <Background vCells={vCells} hCells={hCells} />
      </div>
    </>
  );
};

export default Splash;
