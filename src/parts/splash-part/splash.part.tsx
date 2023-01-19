import { Trans, useTranslation } from 'next-i18next';
import { FC, useRef } from 'react';
import { BorderBox } from '../../components/border-box/BorderBox';
import { Centered } from '../../components/centered/centered';
import { Container } from '../../components/container/container';
import { useContainerCells } from '../../hooks/containerCells';
import { useScrollbar } from '../../hooks/scrollbar';
import { Background } from './background/background';
import styles from './splash.part.module.scss';

export const Splash: FC = () => {
  const containerCells = useContainerCells();
  const scrollbar = useScrollbar();

  const containerRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const btn_text = t('splash.scroll_button');
  const heading_part1 = <>{t('splash.heading_part1')}&nbsp;</>;
  const heading_part2 = (
    <>
      <Trans i18nKey="splash.heading_part2">
        <span id={styles.name}>Name</span>
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
      <Centered horizontal={true}>
        <span id={styles.carret}>&gt;</span>&nbsp;
        {heading_part1}
        {heading_part2}
      </Centered>
      <br />
      <Centered horizontal={true}>
        {heading_part3}
        {heading_part4}
      </Centered>
    </>
  );
  const heading_small = () => (
    <>
      <Centered horizontal={true}>
        <span id={styles.carret}>&gt;</span>&nbsp;
        <span>{heading_part1}</span>
      </Centered>
      <Centered horizontal={true}>{heading_part2}</Centered>
      <br />
      <Centered horizontal={true}>{heading_part3}</Centered>
      <Centered horizontal={true}>{heading_part4}</Centered>
    </>
  );

  const onClick = () => {
    scrollbar?.current?.getScrollElement().scrollTo({
      top: containerRef.current?.clientHeight ?? 0,
      behavior: 'smooth'
    });
  };

  return (
    <Container ref={containerRef}>
      <Centered vertical={true} absolute={true}>
        <h1 id={styles.heading}>
          {containerCells.hCells > 40 ? heading_big() : heading_small()}
        </h1>

        <Centered horizontal={true}>
          <div className={styles.button} onClick={onClick}>
            <Container
              dimensions={{
                vCells: 3,
                hCells: btn_text.length + 6
              }}
            >
              <BorderBox>
                &nbsp;<div className={styles.downArrow}>&gt;</div> {btn_text}
              </BorderBox>
            </Container>
          </div>
        </Centered>
      </Centered>

      <Background />
    </Container>
  );
};
