import React from "react";

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

      getLineLength(el: JSX.Element): number {
        const children: (JSX.Element | string)[] = el?.props?.children;

        if(!children) return 0;

        if(typeof children === 'string') {
          return (children as string).length;
        } else {
          return children.reduce((acc: number, curr: JSX.Element | string) => {
            if(typeof curr === 'string') {
              acc += curr.length;
            } else {
              acc += this.getLineLength(curr);
            }
  
            return acc;
          }, 0);
        }
      }
    
      render() {
        const austriaText = <><span style={{color: '#ed4e50'}}>Au</span><span>str</span><span style={{color: '#ed4e50'}}>ia</span></>;
        const lines = [
            <h1>Servus, I'm <span style={{color: '#ff80ff'}}>Maurice el-Banna</span></h1>,
            <h1>I'm a Full-Stack-Developer from {austriaText}</h1>,
            <div></div>,
            <div style={{cursor: 'pointer'}}>+------------+</div>,
            <div style={{cursor: 'pointer'}}>| v About Me |</div>,
            <div style={{cursor: 'pointer'}}>+------------+</div>
        ];

        const vCells = this.props.vCells > lines.length ? this.props.vCells : lines.length;
        const hCells = this.props.hCells;
        const startPosition = Math.floor(vCells / 2 - lines.length / 2);
    
        let els: any[] = [];

        for(let i = 0; i < vCells; i++) {
            const randStr = new Array(hCells)
                .fill(0)
                .map(() => Math.random() < 0.7 ? '\u00A0' : Math.random().toString(36).substring(3, 4)).join('');

            if(i >= startPosition && i <= startPosition + lines.length) {
              const currentLine = lines[i - startPosition];
              const currentLineLength = this.getLineLength(currentLine);

              if(currentLine) {
                const firstTextPart = randStr.substring(0, Math.floor(hCells / 2 - currentLineLength / 2));
                const secondTextPart = randStr.substring(Math.floor(hCells / 2 + currentLineLength / 2));

                els.push(<div key={i+''} style={{whiteSpace: 'nowrap'}}>
                  <span style={{opacity: '.1', display: 'inline-block'}}>{firstTextPart}</span>
                  <span style={{display: 'inline-block'}}>{currentLine}</span>
                  <span style={{opacity: '.1', display: 'inline-block'}}>{secondTextPart}</span>
                </div>);
                continue;
              }
            }

            els.push(<div key={i+''} style={{opacity: '.1'}}>{randStr}</div>);
        }

        return (
            <>{els}</>
        );
      }
}