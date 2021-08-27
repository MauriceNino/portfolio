import React, { CSSProperties } from 'react';
import { CellsConverter } from '../../helpers/cells-converter';
import { CellProps } from '../../types/default-props';
import style from './BorderBox.module.scss';

type BorderBoxProps = {
  minVCells: number;
  resizeToContent?: boolean;
  disableSideLines: boolean;
} & CellProps &
  JSX.ElementChildrenAttribute;

const BorderBox = (props: BorderBoxProps) => {
  const getVCells = () => {
    let vCells = props.vCells;

    const minVCells = props.minVCells;

    if (minVCells) {
      vCells = vCells > minVCells ? vCells : minVCells;
    }

    return vCells;
  };

  const getContentStyle = (): CSSProperties => {
    let css: CSSProperties = {};

    if (!props.resizeToContent && props.minVCells) {
      css.minHeight = `${CellsConverter.cellsToHeight(props.minVCells)}px`;
      css.height = `${CellsConverter.cellsToHeight(getVCells())}px`;
    }

    return css;
  };

  const disableSideLines = props.disableSideLines;

  const vCells = getVCells();
  const hCells = props.hCells;

  const borderVerticalLine = '|'.repeat(vCells);
  const borderHorizontalLine = '+' + '-'.repeat(hCells - 2) + '+';

  return (
    <div className={style.tBorderBox}>
      <div>{borderHorizontalLine}</div>

      <div className={style.contentFlex}>
        {disableSideLines || (
          <div className={style.border}>{borderVerticalLine}</div>
        )}

        <div style={getContentStyle()} className={style.content}>
          {props.children}
        </div>

        {disableSideLines || (
          <div className={style.border}>{borderVerticalLine}</div>
        )}
      </div>

      <div>{borderHorizontalLine}</div>
    </div>
  );
};

export default BorderBox;
