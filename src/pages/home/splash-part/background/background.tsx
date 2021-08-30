import React, { useEffect, useRef, useState } from 'react';
import PureCanvas from '../../../../components/pure-canvas/pure-canvas';
import { CellsConverter } from '../../../../helpers/cells-converter';
import { CellProps } from '../../../../types/default-props';
const { roundToHeight, roundToWidth } = CellsConverter;

type BackgroundProps = CellProps;
type Circle = {
  x: number;
  y: number;
  radius: number;
  name?: string;

  animInfo: {
    startTime: number;
    start: {
      x: number;
      y: number;
    };
    velocity: {
      x: number;
      y: number;
    };
  };
};

const getRandomCircle = (vCells: number, hCells: number): Circle => {
  const radius = Math.random() * 70 + 50;
  const x = Math.random() * CellsConverter.cellsToWidth(hCells);
  const y = Math.random() * CellsConverter.cellsToHeight(vCells);
  const velX = Math.random() * 300 - 150;
  const velY = Math.random() * 300 - 150;

  return {
    x,
    y,
    radius,
    animInfo: {
      startTime: Date.now(),
      start: { x, y },
      velocity: { x: velX, y: velY }
    }
  };
};

const getTestCircles = (): Circle[] => {
  return [
    {
      x: 100,
      y: 500,
      radius: 50,
      name: '1',
      animInfo: {
        startTime: Date.now(),
        start: { x: 100, y: 500 },
        velocity: { x: 0, y: -100 }
      }
    },

    {
      x: 100,
      y: 100,
      radius: 50,
      name: '2',
      animInfo: {
        startTime: Date.now(),
        start: { x: 100, y: 100 },
        velocity: { x: 0, y: 100 }
      }
    },

    {
      x: 100,
      y: 100,
      radius: 50,
      name: '3',
      animInfo: {
        startTime: Date.now(),
        start: { x: 100, y: 100 },
        velocity: { x: 100, y: 0 }
      }
    },

    {
      x: 1000,
      y: 100,
      radius: 50,
      name: '4',
      animInfo: {
        startTime: Date.now(),
        start: { x: 1000, y: 100 },
        velocity: { x: -100, y: 0 }
      }
    }
  ];
};

const Background = (props: BackgroundProps) => {
  const { vCells, hCells } = props;

  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [circles, setCircles] = useState<Circle[]>([]);

  const animRequestRef = useRef<number>();

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

  const updateCircle = (frameTime: number, circle: Circle) => {
    const animInfo = circle.animInfo;

    const timeDiff = frameTime - animInfo.startTime;
    const distanceX = (animInfo.velocity.x * timeDiff) / 1000;
    const distanceY = (animInfo.velocity.y * timeDiff) / 1000;

    circle.x = animInfo.start.x + distanceX;
    circle.y = animInfo.start.y + distanceY;

    // console.log(circle.x, circle.y);

    const hitTopBound = () =>
      circle.y - circle.radius <= 0 && animInfo.velocity.y < 0;
    const hitBottomBound = () =>
      circle.y + circle.radius >= canvasRef!.height && animInfo.velocity.y > 0;
    const hitRightBound = () =>
      circle.x + circle.radius >= canvasRef!.width && animInfo.velocity.x > 0;
    const hitLeftBound = () =>
      circle.x - circle.radius <= 0 && animInfo.velocity.x < 0;

    if (hitTopBound() || hitBottomBound()) {
      console.log('HIZ TOP BOTTOM');
      animInfo.velocity.y = -animInfo.velocity.y;
      animInfo.startTime = Date.now();
      animInfo.start = { x: circle.x, y: circle.y };
    }

    if (hitRightBound() || hitLeftBound()) {
      animInfo.velocity.x = -animInfo.velocity.x;
      animInfo.startTime = Date.now();
      animInfo.start = { x: circle.x, y: circle.y };
    }

    // Helpers
    // if (animInfo.direction < 0) {
    //   animInfo.direction = 360 + animInfo.direction;
    // }
    // if (circle.x < 0 || circle.x > 1500 || circle.y < 0 || circle.y > 500) {
    //   circle.x = 200;
    //   circle.y = 200;
    //   animInfo.startX = 200;
    //   animInfo.startY = 200;
    //   animInfo.startTime = Date.now();
    // }
  };

  const checkDistance = (circle: Circle, otherCircle: Circle): number => {
    return Math.sqrt(
      (otherCircle.x - circle.x) ** 2 + (otherCircle.y - circle.y) ** 2
    );
  };

  const updateCollidingCircles = (
    ctx: CanvasRenderingContext2D,
    circle: Circle,
    otherCircle: Circle
  ) => {
    const hypotenuse = Math.round(checkDistance(circle, otherCircle));
    const adjacent = Math.abs(Math.round(otherCircle.x) - Math.round(circle.x));

    const angle = Math.acos(adjacent / hypotenuse) * (180 / Math.PI);

    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'lightblue';
    ctx.beginPath();
    ctx.moveTo(circle.x, circle.y);
    ctx.lineTo(otherCircle.x, otherCircle.y);
    ctx.stroke();

    ctx.font = ctx.font.replace(/\d+px/, '16px');
    ctx.fillText(`${angle}°`, circle.x, circle.y + CellsConverter.CELL_HEIGHT);
    ctx.fillText(
      `${hypotenuse}, ${adjacent}`,
      circle.x,
      circle.y + 2 * CellsConverter.CELL_HEIGHT
    );

    // const updateCircle = (c: Circle) => {
    //   const newDirection = getNewDirection(c.animInfo.direction);

    //   console.log(`${c.animInfo.direction} -> ${newDirection}`);
    //   c.animInfo.startTime = Date.now();
    //   c.animInfo.startX = c.x;
    //   c.animInfo.startY = c.y;
    //   c.animInfo.direction = newDirection;
    // };

    // if (!alreadyMovingAway(circle.animInfo.direction)) {
    //   updateCircle(circle);
    //   updateCircle(otherCircle);
    // }
  };

  const drawFrame = () => {
    const ctx = canvasRef?.getContext('2d');
    const frameTime = Date.now();

    if (canvasRef && ctx) {
      ctx.clearRect(0, 0, canvasRef!.width, canvasRef!.height);
      ctx.font = ctx.font.replace(/\d+px/, '16px');

      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        ctx.fillStyle = 'gray';
        drawCircle(ctx, circle);
        updateCircle(frameTime, circle);

        for (let j = i + 1; j < circles.length; j++) {
          if (
            checkDistance(circle, circles[j]) <=
            circle.radius + circles[j].radius
          ) {
            updateCollidingCircles(ctx, circle, circles[j]);
          }
        }
      }
      setCircles(circles);
    }
  };

  const step = () => {
    drawFrame();
    animRequestRef.current = requestAnimationFrame(() => step());
  };

  useEffect(() => {
    setCircles(
      // new Array(50).fill(0).map(() => getRandomCircle(vCells, hCells))
      getTestCircles()
    );
  }, []);

  useEffect(() => {
    animRequestRef.current = requestAnimationFrame(() => step());

    return () => cancelAnimationFrame(animRequestRef.current!);
  });

  return (
    <PureCanvas hCells={hCells} vCells={vCells} contextRef={setCanvasRef} />
  );
};

export default Background;
