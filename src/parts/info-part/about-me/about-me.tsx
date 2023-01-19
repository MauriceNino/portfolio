import { Trans, useTranslation } from 'next-i18next';
import { FC, useEffect, useRef, useState } from 'react';
import { CellsConverter } from '../../../helpers/cells-converter';
import ScrollHelper from '../../../helpers/scroll-helper';
import ViewportHelper from '../../../helpers/viewport-helper';
import styles from './about-me.module.scss';

type AboutMeProps = {
  isFullscreen: boolean;
};

export const AboutMe: FC<AboutMeProps> = props => {
  const isFullscreen = props.isFullscreen;

  const [isVisible, setIsVisible] = useState(false);
  const thisRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const scrollContainer = document.querySelector(
      '#scrollable-content'
    ) as HTMLElement;

    const checkSize = () => {
      if (ViewportHelper.isVisibleInParent(thisRef)) {
        setIsVisible(true);
      }
    };

    ScrollHelper.addListener(scrollContainer, checkSize);
    checkSize();

    return () => {
      ScrollHelper.removeListener(scrollContainer, checkSize);
    };
  }, []);

  return (
    <>
      <h2>{t('about_me.heading')}</h2>
      <br />

      <div ref={thisRef} className={`fadeable ${isVisible ? '' : 'fade-out'}`}>
        <div
          className={styles.avatar}
          style={{
            height: CellsConverter.cellsToHeight(isFullscreen ? 6 : 10),
            width: CellsConverter.cellsToWidth(isFullscreen ? 13 : 22)
          }}
        ></div>
        <Trans i18nKey="about_me.text">
          <a
            href="https://www.linkedin.com/in/maurice-elbanna/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </Trans>
      </div>
    </>
  );
};
