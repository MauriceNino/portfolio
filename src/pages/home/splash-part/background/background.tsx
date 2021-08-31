import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';
import { CellsConverter } from '../../../../helpers/cells-converter';
import { useSSRCheck } from '../../../../helpers/isSSRHook';
import { Circle } from '../../../../types/background';
import { CellProps } from '../../../../types/default-props';
import BackgroundCanvas from './background-canvas';

const getRandomCircle = (vCells: number, hCells: number): Circle => {
  const radius = Math.random() * 70 + 50;
  const x = Math.random() * CellsConverter.cellsToWidth(hCells);
  const y = Math.random() * CellsConverter.cellsToHeight(vCells);
  const velX = (Math.random() * 300 - 150) / 2;
  const velY = (Math.random() * 300 - 150) / 2;

  return {
    x,
    y,
    radius,
    animInfo: {
      velocity: { x: velX, y: velY }
    }
  };
};

const updateCircle = (
  vCells: number,
  hCells: number,
  frameTime: number,
  circle: Circle
) => {
  const animInfo = circle.animInfo;

  const distanceX = (animInfo.velocity.x * frameTime) / 1000;
  const distanceY = (animInfo.velocity.y * frameTime) / 1000;

  circle.x += distanceX;
  circle.y += distanceY;

  // TODO: Find out why top & right are off by one cell
  const hitTopBound = () =>
    circle.y - circle.radius - CellsConverter.CELL_HEIGHT <= 0 &&
    animInfo.velocity.y < 0;
  const hitBottomBound = () =>
    circle.y + circle.radius >= CellsConverter.cellsToHeight(vCells) &&
    animInfo.velocity.y > 0;
  const hitRightBound = () =>
    circle.x + circle.radius + CellsConverter.CELL_WIDTH >=
      CellsConverter.cellsToWidth(hCells) && animInfo.velocity.x > 0;
  const hitLeftBound = () =>
    circle.x - circle.radius <= 0 && animInfo.velocity.x < 0;

  if (hitTopBound() || hitBottomBound()) {
    animInfo.velocity.y = -animInfo.velocity.y;
  }

  if (hitRightBound() || hitLeftBound()) {
    animInfo.velocity.x = -animInfo.velocity.x;
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

const updateCollidingCircles = (c1: Circle, c2: Circle) => {
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

    ca2.velocity.x = u2.x;
    ca2.velocity.y = u2.y;
  }
};

const recalculateCircles = (vCells: number, hCells: number): Circle[] => {
  const pixelsPerCircle = 80000;
  const pixels =
    CellsConverter.cellsToHeight(vCells) * CellsConverter.cellsToWidth(hCells);

  console.log(
    `Starting the animation with ${Math.round(pixels / pixelsPerCircle)} balls`
  );

  return new Array(Math.round(pixels / pixelsPerCircle))
    .fill(0)
    .map(() => getRandomCircle(vCells, hCells));
};

const updateFrame = (
  currentTime: MutableRefObject<number | undefined>,
  animRequestRef: MutableRefObject<number | undefined>,
  cellsRef: MutableRefObject<CellProps>,
  setCircles: Dispatch<SetStateAction<Circle[]>>,
  circles: Circle[]
): void => {
  const newTime = Date.now();
  const frameTime = newTime - currentTime.current!;
  currentTime.current = newTime;

  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];

    updateCircle(
      cellsRef.current.vCells,
      cellsRef.current.hCells,
      frameTime,
      circle
    );

    for (let j = i + 1; j < circles.length; j++) {
      if (
        checkDistance(circle, circles[j]) <=
        circle.radius + circles[j].radius
      ) {
        updateCollidingCircles(circle, circles[j]);
      }
    }
  }

  setCircles([...circles]);
  animRequestRef.current = requestAnimationFrame(() =>
    updateFrame(currentTime, animRequestRef, cellsRef, setCircles, circles)
  );
};

type BackgroundProps = CellProps;

const Background = (props: BackgroundProps) => {
  const { vCells, hCells } = props;
  const [circles, setCircles] = useState<Circle[]>([]);
  const [updateNotifier, setUpdateNotifier] = useState<{}>({});
  const isSSR = useSSRCheck();

  const animRequestRef = useRef<number>();
  const currentTime = useRef<number>();
  const cellsRef = useRef<CellProps>(props);

  // updating reference to container size
  // used, so that requestAnimationFrame does not have to be cancelled on resize
  useEffect(() => {
    cellsRef.current = props;
  }, [props]);

  // Init the circles on the first render
  // TODO: This should be reevaluated when the window is resized
  useEffect(() => {
    if (!isSSR) {
      const circles = recalculateCircles(vCells, hCells);
      setCircles(circles);
      setUpdateNotifier({});
    }
  }, [isSSR]);

  // Restart animation when size changes, or init state changes
  // TODO: Fix dependencies
  useEffect(() => {
    currentTime.current = Date.now();
    animRequestRef.current = requestAnimationFrame(() =>
      updateFrame(currentTime, animRequestRef, cellsRef, setCircles, circles)
    );

    return () => cancelAnimationFrame(animRequestRef.current!);
  }, [updateNotifier]);

  // Set currentTime to now, so that the animation starts from the time the page is focused again
  // Otherwise the circles might move off-screen
  useEffect(() => {
    const visibilitychange = () => {
      if (document.visibilityState !== 'hidden') {
        currentTime.current = Date.now();
      }
    };
    document.addEventListener('visibilitychange', visibilitychange);

    return () =>
      document.removeEventListener('visibilitychange', visibilitychange);
  }, []);

  return <BackgroundCanvas hCells={hCells} vCells={vCells} circles={circles} />;
};

export default Background;
