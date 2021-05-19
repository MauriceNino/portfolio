import React from "react";
import { CellsConverter } from "../../helpers/cells-converter";
import './BorderBox.scss';

export default class BorderBox extends React.Component<any, any, any>{
    cRef: React.RefObject<any>;

    constructor(props: any){
      super(props)
      this.cRef = React.createRef()
    }

    render() {
        let vCells = this.props.vCells;
        let hCells = this.props.hCells;

        if(this.cRef?.current?.offsetHeight) {
            const minimumVCells = CellsConverter.heightToCells(this.cRef?.current?.offsetHeight);
            vCells = vCells > minimumVCells ? vCells : minimumVCells;
        }

        const borderVerticalLine = '+' + '-'.repeat(hCells) + '+';
        const borderHorizontalLine = '|'.repeat(vCells);

        return (
        <div className="t-border-box">        
            <div>{borderVerticalLine}</div>          

            <div className="content-flex">
                <div>{borderHorizontalLine}</div>

                <div><div ref={this.cRef}>{this.props.children}</div></div>

                <div>{borderHorizontalLine}</div>
            </div>
            
            <div>{borderVerticalLine}</div>
        </div>
        );
    }
}