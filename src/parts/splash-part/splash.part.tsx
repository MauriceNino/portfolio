import { Trans, useTranslation } from 'next-i18next';
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
  const heading_part1 = <>{t('splash.heading_part1')}&nbsp;</>;
  const heading_part2 = (
    <>
      <Trans i18nKey="splash.heading_part2">
        <span id={styles.heading}>Name</span>
      </Trans>
    </>
  );
  const heading_part3 = <>{t('splash.heading_part3')}&nbsp;</>;
  const heading_part4 = (
    <>
      <Trans i18nKey="splash.heading_part4">
        <span className={styles.austriaColored}></span>
        <span className={styles.austriaColored}></span>
      </Trans>
    </>
  );

  const heading_big = () => (
    <>
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        <span id={styles.carret}>&gt;</span>&nbsp;
        {heading_part1}
        {heading_part2}
      </Centered>
      <br />
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        {heading_part3}
        {heading_part4}
      </Centered>
    </>
  );
  const heading_small = () => (
    <>
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        <span id={styles.carret}>&gt;</span>&nbsp;
        <span>{heading_part1}</span>
      </Centered>
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        {heading_part2}
      </Centered>
      <br />
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        {heading_part3}
      </Centered>
      <Centered vCells={vCells} hCells={hCells} horizontal={true}>
        {heading_part4}
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
          <h1>{hCells > 40 ? heading_big() : heading_small()}</h1>

          <Centered vCells={vCells} hCells={hCells} horizontal={true}>
            <div className={styles.button} onClick={onClick}>
              <BorderBox hCells={btn_text.length + 6} vCells={1}>
                &nbsp;<div className={styles.downArrow}>&gt;</div> {btn_text}
              </BorderBox>
            </div>
          </Centered>
        </Centered>

        <Background vCells={vCells} hCells={hCells} />
      </div>
    </>
  );
};

export default Splash;
