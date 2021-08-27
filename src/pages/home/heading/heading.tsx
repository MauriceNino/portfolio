import React from 'react';
import { HCellProps } from '../../../types/default-props';
import styles from './heading.module.scss';
import Socials from './socials';

type HeadingProps = HCellProps;

const Heading = (props: HeadingProps) => {
  return (
    <div id={styles.headingContainer}>
      <div>
        <Socials />
      </div>
      <h1 className={props.hCells > 57 ? styles.show : ''}>
        █▀▄▀█ ▄▀█ █░█ ▀█ ░ █ █▀█
        <br />
        █░▀░█ █▀█ █▄█ █▄ ▄ █ █▄█
      </h1>
    </div>
  );
};

export default Heading;
