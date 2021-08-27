import React, { useEffect } from 'react';
import { CellsConverter } from '../../../helpers/cells-converter';
import { TextHelper } from '../../../helpers/text-helper';
import styles from './splash.module.scss';

type Dot = { x: number; y: number };
type State = { map: string[][]; dots: Dot[] };

function onClick() {
  console.log('hi');
  document.getElementById('mainPage')?.scrollIntoView({
    behavior: 'smooth'
  });
}

const POSSIBLE_CHARS = "+*~#'-$%&/()=?!°^";
const SPACE = '\u00A0';

function getRandomString(length: number): string[] {
  return new Array(length)
    .fill(0)
    .map(() =>
      Math.random() < 0.7
        ? SPACE
        : POSSIBLE_CHARS[
            Math.round(Math.random() * (POSSIBLE_CHARS.length - 1))
          ]
    );
}

function getCharMap(vCells: number, hCells: number): string[][] {
  return new Array(vCells).fill(0).map(() => getRandomString(hCells));
}

function getDesiredDotCountBySize(vCells: number, hCells: number) {
  return (vCells * hCells) / 10;
}

function getRandomDots(amount: number, vCells: number, hCells: number): Dot[] {
  const dots: Dot[] = [];

  for (let i = 0; i < amount; i++) {
    let newDot: Dot;
    do {
      newDot = {
        x: Math.round(Math.random() * (hCells - 1)),
        y: Math.round(Math.random() * (vCells - 1))
      };
    } while (dots.some(dot => dot.x === newDot.x && dot.y === newDot.y)); // eslint-disable-line no-loop-func

    dots.push(newDot);
  }

  return dots;
}

function getDefaultState(vCells: number, hCells: number): State {
  const state = {
    map: getCharMap(vCells, hCells),
    dots: getRandomDots(
      getDesiredDotCountBySize(vCells, hCells),
      vCells,
      hCells
    )
  };
  console.log(state);
  return state;
}

function getBackgroundDots({ map, dots }: State): JSX.Element[] {
  let domDots: JSX.Element[] = [];

  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];

    if (map[dot.y][dot.x] !== SPACE) {
      const domDot = (
        <span
          key={`${dot.x}-${dot.y}`}
          className={styles.domDot}
          style={{
            left: CellsConverter.cellsToWidth(dot.x),
            top: CellsConverter.cellsToHeight(dot.y)
          }}
        >
          {map[dot.y][dot.x]}
        </span>
      );
      domDots.push(domDot);
    }
  }

  return domDots;
}

function getBackgroundMap({ map }: State): JSX.Element {
  return map
    .map(line => line.join(''))
    .reduce(
      (acc, e) => (
        <>
          {acc}
          {acc.props.children ? <br /> : ''}
          {e}
        </>
      ),
      <></>
    );
}

function extendBoard(state: State, hCells: number, vCells: number): State {
  let map = [...state.map];

  if (vCells > map.length) {
    map.push(...getCharMap(vCells - map.length, hCells));
  } else if (vCells < map.length) {
    map = map.slice(0, vCells);
  }

  for (let i = 0; i < map.length; i++) {
    const line = map[i];

    if (hCells > line.length) {
      map[i].push(...getRandomString(hCells - line.length));
    } else if (hCells < line.length) {
      map[i] = line.slice(0, hCells);
    }
  }

  const dots = state.dots.filter(dot => dot.x < hCells && dot.y < vCells);

  return { map, dots };
}

export default function Splash(props: any) {
  const vCells = props.vCells;
  const hCells = props.hCells;

  const [state, setState] = React.useState<State>({
    map: [],
    dots: []
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setState({
        map: state.map,
        dots: getRandomDots(
          getDesiredDotCountBySize(vCells, hCells),
          vCells,
          hCells
        )
      });
    }, 1000);

    if (state.map.length !== vCells || state.map[0]?.length !== hCells) {
      setState(extendBoard(state, hCells, vCells));
    }

    return () => {
      clearInterval(interval);
    };
  });

  const headerParts = [
    <h1>
      Servus, I'm <span style={{ color: '#ff80ff' }}>Maurice el-Banna</span>
    </h1>,
    <h1>
      I'm a full stack developer {hCells < 44 && <br />}from{' '}
      <span style={{ color: '#ed4e50' }}>Au</span>
      <span>str</span>
      <span style={{ color: '#ed4e50' }}>ia</span>
    </h1>,
    <br />,
    <div className={styles.button} onClick={onClick}>
      +------------+
      <br />| <div className={styles.downArrow}>&gt;</div> About Me |<br />
      +------------+
    </div>
  ];

  return (
    <>
      <div
        id={styles.splashContainer}
        style={{
          height: `${CellsConverter.cellsToHeight(vCells)}px`,
          width: `${CellsConverter.cellsToWidth(hCells)}px`
        }}
      >
        <div className={styles.content}>
          {TextHelper.centered(headerParts, vCells, hCells)}
        </div>

        <div className={styles.background}>
          <div className={styles.dots}>{getBackgroundDots(state)}</div>
          <div className={styles.map}>{getBackgroundMap(state)}</div>
        </div>
      </div>
    </>
  );
}
