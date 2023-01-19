import { FC, memo } from 'react';
import { CellsConverter } from '../../helpers/cells-converter';
import { CellProps } from '../../types/default-props';

type PureCanvasProps = {
  contextRef: (el: HTMLCanvasElement) => void;
} & CellProps;

export const PureCanvas: FC<PureCanvasProps> = memo(props => {
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
});
