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

  animInfo: {
    startTime: number;
    startX: number;
    startY: number;
    speed: number;
    direction: number; // degrees 0 - 360
  };
};

const getRandomCircle = (vCells: number, hCells: number) => {
  const radius = Math.random() * 70 + 50;
  const x = Math.random() * CellsConverter.cellsToWidth(hCells);
  const y = Math.random() * CellsConverter.cellsToHeight(vCells);
  const direction = Math.floor(Math.random() * 360);
  const speed = Math.random() * 150 + 50;

  return {
    x,
    y,
    radius,
    animInfo: {
      startTime: Date.now(),
      startX: x,
      startY: y,
      speed,
      direction
    }
  };
};

const getTestCircles = () => {
  return [
    {
      x: 100,
      y: 500,
      radius: 50,
      name: '1',
      animInfo: {
        startTime: Date.now(),
        startX: 100,
        startY: 500,
        speed: 100,
        direction: 0
      }
    },

    {
      x: 100,
      y: 100,
      radius: 50,
      name: '2',
      animInfo: {
        startTime: Date.now(),
        startX: 100,
        startY: 100,
        speed: 100,
        direction: 180
      }
    },

    {
      x: 100,
      y: 100,
      radius: 50,
      name: '3',
      animInfo: {
        startTime: Date.now(),
        startX: 100,
        startY: 100,
        speed: 100,
        direction: 90
      }
    },

    {
      x: 1000,
      y: 100,
      radius: 50,
      name: '4',
      animInfo: {
        startTime: Date.now(),
        startX: 1000,
        startY: 100,
        speed: 100,
        direction: 270
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
      //@ts-ignore
      if (circle.name != undefined) {
        //@ts-ignore
        ctx.fillText(circle.name, x, y);
      }
    }
  };

  const updateCircle = (frameTime: number, circle: Circle) => {
    const animInfo = circle.animInfo;
    const direction = animInfo.direction % 360;

    const timeDiff = frameTime - animInfo.startTime;
    const distance = (animInfo.speed * timeDiff) / 1000;
    const radians = (direction * Math.PI) / 180;

    circle.x = animInfo.startX + distance * Math.sin(radians);
    circle.y = animInfo.startY + distance * Math.cos(radians) * -1;

    // console.log(circle.x, circle.y);

    const hitNorthBound = () =>
      circle.y - circle.radius <= 0 && (direction <= 90 || direction >= 270);
    const hitEastBound = () =>
      circle.x + circle.radius >= canvasRef!.width &&
      direction >= 0 &&
      direction <= 180;
    const hitSouthBound = () =>
      circle.y + circle.radius >= canvasRef!.height &&
      direction >= 90 &&
      direction <= 270;
    const hitWestBound = () =>
      circle.x - circle.radius <= 0 && direction >= 180;

    if (hitNorthBound() || hitSouthBound()) {
      animInfo.direction = 180 - direction;
      animInfo.startTime = Date.now();
      animInfo.startX = circle.x;
      animInfo.startY = circle.y;
      if (animInfo.direction < 0) {
        animInfo.direction += 360;
      }
    }

    if (hitEastBound() || hitWestBound()) {
      animInfo.direction = 360 - direction;
      animInfo.startTime = Date.now();
      animInfo.startX = circle.x;
      animInfo.startY = circle.y;
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
