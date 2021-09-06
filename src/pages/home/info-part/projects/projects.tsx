import React, { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import GamerPals from '../../../../assets/projects/gamerpals';
import Mauz from '../../../../assets/projects/mauz';
import More from '../../../../assets/projects/more';
import QHelp from '../../../../assets/projects/qhelp';
import Padded from '../../../../components/padded/padded';
import ScrollHelper from '../../../../helpers/scroll-helper';
import ViewportHelper from '../../../../helpers/viewport-helper';
import styles from './projects.module.scss';

function getAsDiv(el: string) {
  return el
    .split('\n')
    .map(e => e.replaceAll(' ', '\u00A0'))
    .reduce(
      (acc, e) => (
        <>
          {acc}
          {acc.props.children ? <br /> : ''}
          {e}
        </>
      ),
      <></>
    );
}

function SingleProject(props: any) {
  const title = props.title;
  const logo = props.logo;
  const isFullscreen = props.isFullscreen;
  const isLogoLeft = logo.logoLeft;

  const [isVisible, setIsVisible] = useState(false);
  const thisRef = useRef<HTMLDivElement>(null);

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
    <div
      className={`movable ${
        isVisible ? '' : isLogoLeft ? 'move-left' : 'move-right'
      }`}
      ref={thisRef}
    >
      <h3>{title}</h3>
      <div
        className={`${styles.logo} ${styles[logo.class]}`}
        style={{
          float: isFullscreen ? 'right' : isLogoLeft ? 'left' : 'right'
        }}
      >
        <Padded
          bottom={3}
          left={isFullscreen ? 1 : isLogoLeft ? 1 : 3}
          right={isFullscreen ? 1 : isLogoLeft ? 3 : 1}
        >
          {logo.img}
        </Padded>
      </div>
      <Padded left={0} right={0} bottom={3}>
        {props.children}
      </Padded>
    </div>
  );
}

type ProjectProps = {
  isFullscreen: boolean;
};

const Projects = (props: ProjectProps) => {
  const isFullscreen = props.isFullscreen;

  const qhelpLogo = getAsDiv(QHelp);
  const mauzLogo = getAsDiv(Mauz);
  const gamerpalsLogo = getAsDiv(GamerPals);
  const moreLogo = getAsDiv(More);

  const { t } = useTranslation();

  return (
    <>
      <h2>{t('projects.heading')}</h2>
      <br />

      <div id={styles.projectsFlex}>
        <SingleProject
          title={'Portfolio'}
          logo={{ class: 'mauz', img: mauzLogo, logoLeft: false }}
          isFullscreen={isFullscreen}
        >
          <Trans i18nKey="projects.portfolio.text">
            <a href="https://k9scli.io/" target="_blank" rel="noreferrer">
              "k9s"
            </a>
            <a
              href="https://github.com/MauriceNino/portfolio"
              target="_blank"
              rel="noreferrer"
            >
              github.com
            </a>
          </Trans>
        </SingleProject>
        <SingleProject
          title="Q-Help"
          logo={{ class: 'qhelp', img: qhelpLogo, logoLeft: true }}
          isFullscreen={isFullscreen}
        >
          <Trans i18nKey="projects.q_help.text">
            <a href="https://qhelp.app/" target="_blank" rel="noreferrer">
              qhelp.app
            </a>
          </Trans>
        </SingleProject>
        <SingleProject
          title="GamerPals"
          logo={{ class: 'gamerpals', img: gamerpalsLogo, logoLeft: false }}
          isFullscreen={isFullscreen}
        >
          <Trans i18nKey="projects.gamerpals.text">
            <a
              href="http://gamerpals-website.herokuapp.com/home"
              target="_blank"
              rel="noreferrer"
            >
              gamerpals-website.herokuapp.com
            </a>
            <a
              href="https://github.com/MauriceNino/gamerpals-webclient"
              target="_blank"
              rel="noreferrer"
            >
              github.com
            </a>
          </Trans>
        </SingleProject>
        <SingleProject
          title={t('projects.more.heading')}
          logo={{ class: 'more', img: moreLogo, logoLeft: true }}
          isFullscreen={isFullscreen}
        >
          {t('projects.more.text')}
          <br />
          <br />-{' '}
          <a
            href="https://github.com/MauriceNino"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <br />-{' '}
          <a
            href="https://www.linkedin.com/in/maurice-elbanna/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <br />-{' '}
          <a
            href="https://stackoverflow.com/users/9150652/mauricenino"
            target="_blank"
            rel="noreferrer"
          >
            StackOverflow
          </a>
        </SingleProject>
      </div>
    </>
  );
};

export default Projects;
