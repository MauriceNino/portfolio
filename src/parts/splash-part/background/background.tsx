import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';
import { animate, Animation } from '../../../helpers/animations';
import { CellsConverter } from '../../../helpers/cells-converter';
import { useIsSSR } from '../../../hooks/isSSR';
import { Circle } from '../../../types/background';
import { CellProps } from '../../../types/default-props';
import BackgroundCanvas from './background-canvas';

const DEFAULT_POPUP_ANIMATION: Animation<{ scale: number }> = {
  keyframes: {
    0: { scale: 0 },
    80: { scale: 1.4 },
    100: { scale: 1 }
  },
  duration: 320,
  offset: 0
};

const getRandomCircle = (vCells: number, hCells: number): Circle => {
  const radius = Math.random() * 70 + 50;
  const x = Math.random() * CellsConverter.cellsToWidth(hCells);
  const y = Math.random() * CellsConverter.cellsToHeight(vCells);
  const velX = Math.random() * 150 - 75;
  const velY = Math.random() * 150 - 75;

  const customOffsetPopup = {
    ...DEFAULT_POPUP_ANIMATION,
    offset: Math.random() * 400
  };

  return {
    x,
    y,
    radius,
    animInfo: {
      velocity: { x: velX, y: velY }
    },
    scaleAnimation: customOffsetPopup,
    scaleAnimationState: null
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

  const hitTopBound = () =>
    circle.y - circle.radius <= 0 && animInfo.velocity.y < 0;
  const hitBottomBound = () =>
    circle.y + circle.radius >= CellsConverter.cellsToHeight(vCells) &&
    animInfo.velocity.y > 0;
  const hitRightBound = () =>
    circle.x + circle.radius >= CellsConverter.cellsToWidth(hCells) &&
    animInfo.velocity.x > 0;
  const hitLeftBound = () =>
    circle.x - circle.radius <= 0 && animInfo.velocity.x < 0;

  if (hitTopBound() || hitBottomBound()) {
    animInfo.velocity.y = -animInfo.velocity.y;
  }

  if (hitRightBound() || hitLeftBound()) {
    animInfo.velocity.x = -animInfo.velocity.x;
  }

  circle.scaleAnimationState = animate(
    circle.scaleAnimation,
    circle.scaleAnimationState,
    frameTime
  );
};

const areColliding = (circle: Circle, otherCircle: Circle): boolean => {
  return (
    Math.sqrt(
      (otherCircle.x - circle.x) ** 2 + (otherCircle.y - circle.y) ** 2
    ) <=
    circle.radius + otherCircle.radius
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

const recalculateCircles = (
  oldCircles: Circle[],
  vCells: number,
  hCells: number
): Circle[] => {
  const pixelsPerCircle = 80000;
  const pixels =
    CellsConverter.cellsToHeight(vCells) * CellsConverter.cellsToWidth(hCells);
  const neededCircles = Math.round(pixels / pixelsPerCircle);

  console.log(
    `Starting the animation with ${Math.round(pixels / pixelsPerCircle)} balls`
  );
  const circles: Circle[] = oldCircles;

  while (circles.length < neededCircles) {
    const circle = getRandomCircle(vCells, hCells);

    if (circles.every(c => !areColliding(circle, c))) {
      circles.push(circle);
    }
  }

  while (circles.length > neededCircles) {
    circles.pop();
  }

  return circles;
};

const updateFrame = (
  currentTime: MutableRefObject<number | undefined>,
  animRequestRef: MutableRefObject<number | undefined>,
  cellsRef: MutableRefObject<CellProps>,
  setCircles: Dispatch<SetStateAction<Circle[]>>,
  circlesRef: MutableRefObject<Circle[]>
): void => {
  const newTime = Date.now();
  const frameTime = newTime - currentTime.current!;
  currentTime.current = newTime;

  const circles = circlesRef.current;

  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];

    updateCircle(
      cellsRef.current.vCells,
      cellsRef.current.hCells,
      frameTime,
      circle
    );

    for (let j = i + 1; j < circles.length; j++) {
      if (areColliding(circle, circles[j])) {
        updateCollidingCircles(circle, circles[j]);
      }
    }
  }

  setCircles([...circles]);
  circlesRef.current = circles;

  animRequestRef.current = requestAnimationFrame(() =>
    updateFrame(currentTime, animRequestRef, cellsRef, setCircles, circlesRef)
  );
};

type BackgroundProps = CellProps;

const Background = (props: BackgroundProps) => {
  const { vCells, hCells } = props;
  const [circles, setCircles] = useState<Circle[]>([]);
  const [updateNotifier, setUpdateNotifier] = useState<{}>({});
  const isSSR = useIsSSR();

  const animRequestRef = useRef<number>();
  const currentTime = useRef<number>();
  const cellsRef = useRef<CellProps>(props);
  const circlesRef = useRef<Circle[]>(circles);

  // Init the circles on the first render, or on size change
  useEffect(() => {
    if (!isSSR) {
      const newCircles = recalculateCircles(circlesRef.current, vCells, hCells);
      setCircles(() => newCircles);
      setUpdateNotifier({});
      circlesRef.current = newCircles;
    }

    // updating reference to container size
    // used, so that requestAnimationFrame does not have to be cancelled on resize
    cellsRef.current = {
      vCells,
      hCells
    };
  }, [isSSR, vCells, hCells]);

  // Restart animation when init state changes
  useEffect(() => {
    currentTime.current = Date.now();
    animRequestRef.current = requestAnimationFrame(() =>
      updateFrame(currentTime, animRequestRef, cellsRef, setCircles, circlesRef)
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
