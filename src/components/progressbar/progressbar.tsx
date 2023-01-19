import { FC, useEffect, useRef, useState } from 'react';
import ScrollHelper from '../../helpers/scroll-helper';
import ViewportHelper from '../../helpers/viewport-helper';
import { useContainerCells } from '../../hooks/containerCells';
import styles from './progressbar.module.scss';

const htmlWhitespace = (str: string) => str.replaceAll(' ', '\u00A0');

const getFakeProgressText = (
  usingCells: number,
  title: string,
  percent: number
) => {
  const filledCells = usingCells - title.length - percent.toString().length - 2;

  return `[${title} ${'&nbsp;'.repeat(
    filledCells < 0 ? 0 : filledCells
  )}${percent}%]`;
};

const getProgressText = (
  usingCells: number,
  title: string,
  percent: number
) => {
  const colorClass = percent > 74 ? 'green' : percent > 49 ? 'yellow' : 'red';
  const filledCells = Math.round((usingCells / 100) * percent);

  // Get the progressbar without the text
  let progressText =
    '|'.repeat(filledCells) + ' '.repeat(usingCells - filledCells);

  // Replace parts of progressbar with the text
  progressText = `${title} ${progressText.substring(
    title.length + 1,
    progressText.length - percent.toString().length - 1
  )}${percent}%`;

  // Apply color to the relevant parts in the progressbar and add bounds
  progressText = `[<span class="${styles[colorClass]}">${htmlWhitespace(
    progressText.substring(0, filledCells)
  )}</span>${htmlWhitespace(progressText.substring(filledCells))}]`;

  return progressText;
};

type ProgressbarProps = {
  title: string;
  percent: number;
};

export const Progressbar: FC<ProgressbarProps> = props => {
  const { title, percent } = props;

  const { hCells } = useContainerCells();
  const [isVisible, setIsVisible] = useState(false);
  const thisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = document.querySelector(
      '#scrollable-content'
    ) as HTMLElement;

    const checkSize = () => {
      if (ViewportHelper.isVisibleInParent(thisRef)) {
        setIsVisible(true);
        ScrollHelper.removeListener(scrollContainer, checkSize);
      }
    };

    ScrollHelper.addListener(scrollContainer, checkSize);
    checkSize();

    return () => {
      ScrollHelper.removeListener(scrollContainer, checkSize);
    };
  }, []);

  const usingCells = hCells - 2;

  const progressText = getProgressText(usingCells, title, percent);
  const fakeProgressText = getFakeProgressText(usingCells, title, percent);

  return (
    <div className={styles.progressItem} ref={thisRef}>
      <div dangerouslySetInnerHTML={{ __html: fakeProgressText }}></div>
      <div
        className={`${styles.progressItemColored} ${
          isVisible === false ? '' : styles.loaded
        }`}
        dangerouslySetInnerHTML={{ __html: progressText }}
      ></div>
    </div>
  );
};
