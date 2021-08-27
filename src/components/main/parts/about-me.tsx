import { useEffect, useRef, useState } from 'react';
import { CellsConverter } from '../../../helpers/cells-converter';
import ScrollHelper from '../../../helpers/scroll-helper';
import ViewportHelper from '../../../helpers/viewport-helper';
import styles from './about-me.module.scss';

export default function AboutMe(props: any) {
  const isFullscreen = props.isFullscreen;

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
    <>
      <h2>About Me</h2>
      <br />

      <div ref={thisRef} className={`fadeable ${isVisible ? '' : 'fade-out'}`}>
        <div
          className={styles.avatar}
          style={{
            height: CellsConverter.cellsToHeight(isFullscreen ? 6 : 10),
            width: CellsConverter.cellsToWidth(isFullscreen ? 13 : 22)
          }}
        ></div>
        I'm a 22 year old full stack developer currently living in Austria. My
        passion is creating experiences for users, especially on the web.
        <br />
        <br />
        I've worked on small private projects as well as large long-term
        international projects. Despite having only 3 years of professional
        experience, I've been programming for over 10 years now.
        <br />
        <br />
        If you would like to have me on a project, feel free to contact me on{' '}
        <a
          href="https://www.linkedin.com/in/maurice-elbanna/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        .
      </div>
    </>
  );
}
