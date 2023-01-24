import { CanvasHTMLAttributes, forwardRef, memo } from 'react';
import { CellsConverter } from '../../helpers/cells-converter';
import { useContainerCells } from '../../hooks/containerCells';

export const PureCanvas = memo(
  forwardRef<HTMLCanvasElement, CanvasHTMLAttributes<HTMLCanvasElement>>(
    (props, ref) => {
      const { vCells, hCells } = useContainerCells();

      return (
        <canvas
          {...props}
          height={CellsConverter.cellsToHeight(vCells)}
          width={CellsConverter.cellsToWidth(hCells)}
          ref={ref}
        ></canvas>
      );
    }
  )
);
