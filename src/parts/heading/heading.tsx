import React from 'react';
import { useSSRCheck } from '../../helpers/isSSRHook';
import { HCellProps } from '../../types/default-props';
import styles from './heading.module.scss';
import Socials from './socials';

type HeadingProps = HCellProps;

const Heading = (props: HeadingProps) => {
  const isSSR = useSSRCheck();

  return (
    <div id={styles.headingContainer}>
      <div>
        <Socials />
      </div>
      {!isSSR && (
        <p className={props.hCells > 57 ? styles.show : ''}>
          █▀▄▀█ ▄▀█ █░█ ▀█ ░ █ █▀█
          <br />
          █░▀░█ █▀█ █▄█ █▄ ▄ █ █▄█
        </p>
      )}
    </div>
  );
};

export default Heading;
