import { Trans, useTranslation } from 'next-i18next';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { AsciiImage } from '../../../components/ascii-image/ascii-image';
import { Container } from '../../../components/container/container';
import ScrollHelper from '../../../helpers/scroll-helper';
import ViewportHelper from '../../../helpers/viewport-helper';
import styles from './projects.module.scss';

type SingleProjectProps = PropsWithChildren<{
  title: string;
  logo: { src: string; logoLeft: boolean };
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
        className={`${styles.logo}`}
        style={{
          float: isFullscreen ? 'right' : isLogoLeft ? 'left' : 'right'
        }}
      >
        <Container
          dimensions={{
            vCells: 12
          }}
          padding={{
            top: 1,
            bottom: 2,
            left: isFullscreen ? 1 : isLogoLeft ? 1 : 3,
            right: isFullscreen ? 1 : isLogoLeft ? 3 : 1
          }}
          widthUnset
        >
          <AsciiImage src={logo.src} fitToHeight preload />
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

  const { t } = useTranslation();

  const projectList = [
    {
      title: 'Portfolio',
      logo: '/assets/images/projects/portfolio_logo.png',
      text: 'projects.portfolio.text',
      components: {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        k9s: <a href="https://k9scli.io/" target="_blank" rel="noreferrer" />,
        github: (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            href="https://github.com/MauriceNino/portfolio"
            target="_blank"
            rel="noreferrer"
          />
        )
      }
    },
    {
      title: 'Dashdot',
      logo: '/assets/images/projects/dashdot_logo_alpha.png',
      text: 'projects.dashdot.text',
      components: {
        demo: (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a href="https://dash.mauz.io" target="_blank" rel="noreferrer" />
        ),
        github: (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            href="https://github.com/MauriceNino/dashdot"
            target="_blank"
            rel="noreferrer"
          />
        )
      }
    },
    {
      title: 'Q-Help',
      logo: '/assets/images/projects/qhelp_logo_alpha.png',
      text: 'projects.qhelp.text',
      components: {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        demo: <a href="https://qhelp.app/" target="_blank" rel="noreferrer" />
      }
    },
    {
      title: t('projects.more.heading'),
      logo: '/assets/images/projects/more_icon.png',
      text: 'projects.more.text',
      components: {
        github: (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            href="https://github.com/MauriceNino"
            target="_blank"
            rel="noreferrer"
          />
        ),
        linkedin: (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            href="https://www.linkedin.com/in/maurice-elbanna/"
            target="_blank"
            rel="noreferrer"
          />
        ),
        stackoverflow: (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            href="https://stackoverflow.com/users/9150652/mauricenino"
            target="_blank"
            rel="noreferrer"
          />
        )
      }
    }
  ];

  return (
    <>
      <h2>{t('projects.heading')}</h2>
      <br />

      <div id={styles.projectsFlex}>
        {projectList.map((project, i) => (
          <SingleProject
            key={project.title}
            title={project.title}
            logo={{
              src: project.logo,
              logoLeft: i % 2 === 1
            }}
            isFullscreen={isFullscreen}
          >
            <Trans
              i18nKey={project.text}
              //@ts-ignore
              components={project.components}
            />
          </SingleProject>
        ))}
      </div>
    </>
  );
};
