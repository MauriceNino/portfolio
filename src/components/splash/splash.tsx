import React, { CSSProperties } from "react";
import { CellsConverter } from "../../helpers/cells-converter";
import './splash.scss';

export default class SplashPage extends React.Component<any, any, any> {

    private interval: any;

    constructor(props: any) {
        super(props);
    
        this.state = {};
      }
    
      componentDidMount() {
        this.interval = setInterval(() => this.setState({}), 2000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

      getRandomString(length: number) {
        return new Array(length)
                .fill(0)
                .map(() => Math.random() < 0.7 ? '\u00A0' : Math.random().toString(36).substring(3, 4)).join('');
      }

      getBackgroundElements(vCells: number, hCells: number) {
        return new Array(vCells).fill(0).map((_, i) => <div key={i+''}>{this.getRandomString(hCells)}</div>);
      }

      partitionArray<T>(arr: T[], on: (el: T) => boolean): T[][] {
        return arr.reduce((acc, curr) => {
          if(on(curr)) {
            acc.push([]);
          } else {
            acc[acc.length - 1].push(curr);
          }

          return acc;
        }, [[]] as T[][])
        .filter(arr => arr.length !== 0);
      }

      getLineLength(el: JSX.Element): number {
        const children: (JSX.Element | string)[] = el?.props?.children;

        if(!children) return 0;

        if(typeof children === 'string') {
          return (children as string).length;
        } else {
          return this.partitionArray(children as JSX.Element[], (e) => e.type === 'br')
            .map(el => 
              el.reduce((acc: number, curr: JSX.Element | string) => {
                if(typeof curr === 'string') {
                  acc += curr.length;
                } else {
                  acc += this.getLineLength(curr);
                }
      
                return acc;
              }, 0)
            ).reduce((a, b) => a > b ? a : b, 0);
        }
      }

      getLineHeight(el: JSX.Element): number {
        return (el.props.children || []).filter((c: JSX.Element) => c.type === 'br').length + 1;
      }

      centered(elements: JSX.Element[], parentVCells: number, parentHCells: number): JSX.Element[] {
        const allElementsHeight = elements.map(el => this.getLineHeight(el)).reduce((a, b) => a + b, 0);
        let reachedHeight = 0;

        return elements.map((el, i) => {
          const elLength = this.getLineLength(el);
          const elHeight = this.getLineHeight(el);

          const distanceLeft = CellsConverter.cellsToWidth(Math.floor(parentHCells / 2 - elLength / 2));
          const distanceTop = CellsConverter.cellsToHeight(Math.floor(parentVCells / 2 - allElementsHeight / 2 + reachedHeight));

          reachedHeight += elHeight;

          const style: CSSProperties = {
            position: 'absolute',
            left: `${distanceLeft}px`,
            top: `${distanceTop}px`,
            whiteSpace: 'nowrap'
          }

          return <div style={style} key={i}>{el}</div>;
        })

      }

      onClick() {
        document.getElementById('main-page')?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    
      render() {
        const vCells = this.props.vCells;
        const hCells = this.props.hCells;

        const headerParts = [
          <h1>Servus, I'm <span style={{color: '#ff80ff'}}>Maurice el-Banna</span></h1>,
          <h1>
            I'm a Full-Stack-Developer {hCells < 44 && <br/>}from <span style={{color: '#ed4e50'}}>Au</span><span>str</span><span style={{color: '#ed4e50'}}>ia</span>
          </h1>,
          <br/>,
          <div className="button" onClick={this.onClick}>
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
                {this.centered(headerParts, vCells, hCells)}
              </div>

              <div className="background">
                {this.getBackgroundElements(vCells, hCells)}
              </div>
            </div>
            </>
        );
      }
}