import React, { memo } from 'react';
import { CellsConverter } from '../../helpers/cells-converter';
import { CellProps } from '../../types/default-props';

type PureCanvasProps = {
  contextRef: (el: HTMLCanvasElement) => void;
} & CellProps;

const PureCanvas = (props: PureCanvasProps) => {
  const { vCells, hCells } = props;

  return (
    <canvas
      height={CellsConverter.cellsToHeight(vCells)}
      width={CellsConverter.cellsToWidth(hCells)}
      ref={el => {
        el && props.contextRef(el);
      }}
    ></canvas>
  );
};

export default memo(PureCanvas);
