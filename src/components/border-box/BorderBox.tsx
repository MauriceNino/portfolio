import { CSSProperties, FC, PropsWithChildren } from 'react';
import { CellsConverter } from '../../helpers/cells-converter';
import {
  ContainerCellsProvider,
  useContainerCells
} from '../../hooks/containerCells';
import style from './BorderBox.module.scss';

const getContentStyle = (vCells: number, minVCells?: number): CSSProperties => {
  let css: CSSProperties = {};

  if (minVCells) {
    css.minHeight = `${CellsConverter.cellsToHeight(minVCells)}px`;
    css.height = `${CellsConverter.cellsToHeight(
      Math.max(vCells, minVCells)
    )}px`;
  }

  return css;
};

type BorderBoxProps = PropsWithChildren<{
  minVCells?: number;
  disabledSidelines?: boolean;
}>;

export const BorderBox: FC<BorderBoxProps> = props => {
  const containerCells = useContainerCells();

  const vCells = Math.max(containerCells.vCells - 2, props.minVCells ?? 0);
  const hCells = containerCells.hCells;

  const borderVerticalLine = '|'.repeat(vCells);
  const borderHorizontalLine = '+' + '-'.repeat(hCells - 2) + '+';

  return (
    <div className={style.tBorderBox}>
      <div>{borderHorizontalLine}</div>

      <div className={style.contentFlex}>
        {props.disabledSidelines || (
          <div className={style.border}>{borderVerticalLine}</div>
        )}

        <div
          style={getContentStyle(vCells, props.minVCells)}
          className={style.content}
        >
          <ContainerCellsProvider
            value={{
              hCells: hCells - (props.disabledSidelines ? 0 : 2),
              vCells: vCells
            }}
          >
            {props.children}
          </ContainerCellsProvider>
        </div>

        {props.disabledSidelines || (
          <div className={style.border}>{borderVerticalLine}</div>
        )}
      </div>

      <div>{borderHorizontalLine}</div>
    </div>
  );
};
