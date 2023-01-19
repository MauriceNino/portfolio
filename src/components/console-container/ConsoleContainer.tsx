import { FC, PropsWithChildren } from 'react';
import { useContainerCells } from '../../hooks/containerCells';
import styles from './ConsoleContainer.module.scss';

type ConsoleContainerProps = PropsWithChildren<{
  showDimensions: boolean;
}>;

export const ConsoleContainer: FC<ConsoleContainerProps> = ({
  children,
  showDimensions
}) => {
  const containerCells = useContainerCells();
  const consoleWidth = `${Math.ceil(containerCells.hCells * 9.6 + 1)}px`;
  const consoleHeight = `${Math.ceil(containerCells.vCells * 21 + 1)}px`;

  const dimensions = (
    <div
      style={{
        position: 'absolute',
        bottom: '0',
        left: '19.2px'
      }}
    >
      {containerCells.vCells}H / {containerCells.hCells}W
    </div>
  );

  return (
    <div
      className={styles.tConsoleContainer}
      style={{ width: consoleWidth, height: consoleHeight }}
    >
      {showDimensions && dimensions}
      {children}
    </div>
  );
};
