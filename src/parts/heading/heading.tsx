import { FC } from 'react';
import { useIsSSR } from '../../hooks/isSSR';
import { HCellProps } from '../../types/default-props';
import styles from './heading.module.scss';
import { Socials } from './socials';

type HeadingProps = HCellProps;

export const Heading: FC<HeadingProps> = props => {
  const isSSR = useIsSSR();

  return (
    <div id={styles.headingContainer}>
      <div>
        <Socials />
      </div>
      {!isSSR && (
        <>
          <p className={props.hCells > 120 ? styles.show : ''}>
            █▀▄▀█ ▄▀█ █░█ █▀█ █ █▀▀ █▀▀ &nbsp;&nbsp;&nbsp; █▀▀
            █░░ ▄▄ █▄▄ ▄▀█ █▄░█ █▄░█ ▄▀█
            <br />
            █░▀░█ █▀█ █▄█ █▀▄ █ █▄▄ ██▄ &nbsp;&nbsp;&nbsp; ██▄
            █▄▄ ░░ █▄█ █▀█ █░▀█ █░▀█ █▀█
          </p>

          <p className={props.hCells > 35 ? styles.show : ''}>
            █▀▄▀█
            <br />
            █░▀░█
          </p>
        </>
      )}
    </div>
  );
};
