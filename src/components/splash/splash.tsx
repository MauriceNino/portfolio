import React, { CSSProperties, useEffect } from "react";
import { CellsConverter } from "../../helpers/cells-converter";
import { TextHelper } from "../../helpers/text-helper";
import './splash.scss';



function getRandomString(length: number) {
  return new Array(length)
          .fill(0)
          .map(() => Math.random() < 0.7 ? '\u00A0' : Math.random().toString(36).substring(3, 4)).join('');
}

function getBackgroundElements(vCells: number, hCells: number) {
  return new Array(vCells).fill(0).map((_, i) => <div key={i+''}>{getRandomString(hCells)}</div>);
}

function onClick() {
  document.getElementById('main-page')?.scrollIntoView({
    behavior: 'smooth'
  });
}

export default (props: any) => {
  const [state, setState] = React.useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setState([]);
    }, 2000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const vCells = props.vCells;
  const hCells = props.hCells;

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
          {getBackgroundElements(vCells, hCells)}
        </div>
      </div>
      </>
  );
}