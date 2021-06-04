import React, { useEffect } from "react";
import { CellsConverter } from "../../helpers/cells-converter";
import { TextHelper } from "../../helpers/text-helper";
import './splash.scss';

type Dot = {x: number, y: number};
type State = {map: string[][], dots: Dot[]};

function onClick() {
  document.getElementById('main-page')?.scrollIntoView({
    behavior: 'smooth'
  });
}

const possibleChars = '+*~#\'-$%&/()=?!°^';

function getRandomString(length: number): string[] {
  return new Array(length)
          .fill(0)
          .map(() => Math.random() < 0.7 ? '\u00A0' : possibleChars[Math.round(Math.random() * (possibleChars.length - 1))]);
}

function getCharMap(vCells: number, hCells: number): string[][] {
  console.log(hCells)
  return new Array(vCells).fill(0).map(() => getRandomString(hCells));
}

function getRandomDots(amount: number, vCells: number, hCells: number): Dot[] {
  return new Array(amount).fill(0).map(() => ({
    x: Math.round(Math.random() * hCells),
    y: Math.round(Math.random() * vCells)
  }));
}

function getDefaultState(vCells: number, hCells: number): State {
  return {
    map: getCharMap(vCells, hCells),
    dots: getRandomDots(Math.round(Math.random() * 4 + 2), vCells, hCells)
  };
}

function mapToElements(state: State): JSX.Element[] {
  console.log(state)
  return state.map.map((line, i) => {
    return <div key={i+''}>{
      line.join('')
    }</div>
  });
}

export default function Splash(props: any) {
  const vCells = props.vCells;
  const hCells = props.hCells;

  const [state, setState] = React.useState<State>(getDefaultState(vCells, hCells));

  if(state.map.length !== vCells || state.map[0]?.length !== hCells) {
    setState(getDefaultState(vCells, hCells));
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setState({
    //     map: state.map,
    //     dots: []
    //   });
    // }, 2000);

    // return () => {
    //   clearInterval(interval);
    // }
  }, []);

  const headerParts = [
    <h1>Servus, I'm <span style={{color: '#ff80ff'}}>Maurice el-Banna</span></h1>,
    <h1>
      I'm a full stack developer {hCells < 44 && <br/>}from <span style={{color: '#ed4e50'}}>Au</span><span>str</span><span style={{color: '#ed4e50'}}>ia</span>
    </h1>,
    <br/>,
    <div className="button" onClick={onClick}>
      +------------+<br/>
      | <div className="down-arrow">&gt;</div> About Me |<br/>
      +------------+
    </div>
  ];

  return (
      <>
      <div id="splash-container" style={{
        height: `${CellsConverter.cellsToHeight(vCells)}px`,
        width: `${CellsConverter.cellsToWidth(hCells)}px`
      }}>
        <div className="content">
          {TextHelper.centered(headerParts, vCells, hCells)}
        </div>

        <div className="background">
          {mapToElements(state)}
        </div>
      </div>
      </>
  );
}