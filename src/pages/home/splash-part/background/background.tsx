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

  const rotateVelocity = (
    v: Circle['animInfo']['velocity'],
    theta: number
  ): Circle['animInfo']['velocity'] => {
    return {
      x: v.x * Math.cos(theta) - v.y * Math.sin(theta),
      y: v.x * Math.sin(theta) + v.y * Math.cos(theta)
    };
  };

  const updateCollidingCircles = (
    ctx: CanvasRenderingContext2D,
    c1: Circle,
    c2: Circle
  ) => {
    const ca1 = c1.animInfo,
      ca2 = c2.animInfo;

    const dVel = {
      x: ca1.velocity.x - ca2.velocity.x,
      y: ca1.velocity.y - ca2.velocity.y
    };
    if (dVel.x * (c2.x - c1.x) + dVel.y * (c2.y - c1.y) >= 0) {
      // Calculate the masses
      const m1 = Math.PI * c1.radius ** 2;
      const m2 = Math.PI * c2.radius ** 2;

      // Calculate the angle between the circles (in radians)
      const theta = -Math.atan2(c2.y - c1.y, c2.x - c1.x);

      // Calculate the normalized velocities
      const v1 = rotateVelocity(ca1.velocity, theta);
      const v2 = rotateVelocity(ca2.velocity, theta);

      // Calculate the final velocities and denormalize them
      const u1 = rotateVelocity(
        {
          x: (v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2),
          y: v1.y
        },
        -theta
      );
      const u2 = rotateVelocity(
        {
          x: (v2.x * (m2 - m1)) / (m1 + m2) + (v1.x * 2 * m1) / (m1 + m2),
          y: v2.y
        },
        -theta
      );

      // Update the animation info on the circles
      ca1.velocity.x = u1.x;
      ca1.velocity.y = u1.y;
      ca1.start.x = c1.x;
      ca1.start.y = c1.y;
      ca1.startTime = Date.now();

      ca2.velocity.x = u2.x;
      ca2.velocity.y = u2.y;
      ca2.start.x = c2.x;
      ca2.start.y = c2.y;
      ca2.startTime = Date.now();
    }
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
    if (canvasRef) {
      const pixelsPerCircle = 100000;
      const pixels = canvasRef!.width * canvasRef!.height;

      setCircles(
        new Array(Math.round(pixels / pixelsPerCircle))
          .fill(0)
          .map(() => getRandomCircle(vCells, hCells))
      );
    }
  }, [canvasRef]);

  useEffect(() => {
    animRequestRef.current = requestAnimationFrame(() => step());

    return () => cancelAnimationFrame(animRequestRef.current!);
  });

  return (
    <PureCanvas hCells={hCells} vCells={vCells} contextRef={setCanvasRef} />
  );
};

export default Background;
