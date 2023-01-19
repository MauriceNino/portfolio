import { Trans, useTranslation } from 'next-i18next';
import {
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import GamerPals from '../../../assets/projects/gamerpals';
import Mauz from '../../../assets/projects/mauz';
import More from '../../../assets/projects/more';
import QHelp from '../../../assets/projects/qhelp';
import { Container } from '../../../components/container/container';
import ScrollHelper from '../../../helpers/scroll-helper';
import ViewportHelper from '../../../helpers/viewport-helper';
import styles from './projects.module.scss';

const getAsDiv = (el: string) => {
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
};

type SingleProjectProps = PropsWithChildren<{
  title: string;
  logo: { class: string; img: ReactNode; logoLeft: boolean };
  isFullscreen: boolean;
}>;

const SingleProject: FC<SingleProjectProps> = props => {
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
        <Container
          padding={{
            top: 1,
            bottom: 3,
            left: isFullscreen ? 1 : isLogoLeft ? 1 : 3,
            right: isFullscreen ? 1 : isLogoLeft ? 3 : 1
          }}
          heightUnset
          widthUnset
        >
          {logo.img}
        </Container>
      </div>
      <Container
        padding={{
          top: 1,
          bottom: 3
        }}
        heightUnset
        widthUnset
      >
        {props.children}
      </Container>
    </div>
  );
};

type ProjectProps = {
  isFullscreen: boolean;
};

export const Projects: FC<ProjectProps> = props => {
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
