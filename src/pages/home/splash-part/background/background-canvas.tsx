import React, { useEffect, useState } from 'react';
import PureCanvas from '../../../../components/pure-canvas/pure-canvas';
import { CellsConverter } from '../../../../helpers/cells-converter';
import { Circle } from '../../../../types/background';
import { CellProps } from '../../../../types/default-props';
const { roundToHeight, roundToWidth } = CellsConverter;

const drawCircle = (ctx: CanvasRenderingContext2D, circle: Circle) => {
  const { x, y, radius } = circle;

  for (
    let x_offset = 0;
    x_offset <= (radius * 2) / Math.PI;
    x_offset += CellsConverter.CELL_WIDTH
  ) {
    const y_offset = Math.sqrt(circle.radius ** 2 - x_offset ** 2);

    // prettier-ignore
    // eslint-disable-next-line no-lone-blocks
    { 
      // ctx.fillStyle = 'white';
      ctx.fillText('#', roundToWidth(x + x_offset), roundToHeight(y - y_offset));
      ctx.fillText('#', roundToWidth(x + x_offset), roundToHeight(y + y_offset));
      // ctx.fillStyle = 'green';
      ctx.fillText('#', roundToWidth(x + y_offset), roundToHeight(y - x_offset));
      ctx.fillText('#', roundToWidth(x + y_offset), roundToHeight(y + x_offset));
      if (x_offset !== 0) {
        // ctx.fillStyle = 'blue';
        ctx.fillText('#', roundToWidth(x - y_offset), roundToHeight(y - x_offset));
        ctx.fillText('#', roundToWidth(x - y_offset), roundToHeight(y + x_offset));
        // ctx.fillStyle = 'red';
        ctx.fillText('#', roundToWidth(x - x_offset), roundToHeight(y - y_offset));
        ctx.fillText('#', roundToWidth(x - x_offset), roundToHeight(y + y_offset));
      }

    }
    if (circle.name !== undefined) {
      ctx.fillText(circle.name, x, y);
    }
  }
};

type BackgroundCanvasProps = {
  circles: Circle[];
} & CellProps;

const BackgroundCanvas = (props: BackgroundCanvasProps) => {
  const { hCells, vCells, circles } = props;

  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef?.getContext('2d');

    if (canvasRef && ctx) {
      ctx.fillStyle = '#525056';
      ctx.font = '16px Arial';
      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);

      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        drawCircle(ctx, circle);
      }
    }
  }, [canvasRef, circles]);
  return (
    <PureCanvas hCells={hCells} vCells={vCells} contextRef={setCanvasRef} />
  );
};

export default BackgroundCanvas;
