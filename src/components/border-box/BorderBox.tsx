import React, { CSSProperties } from "react";
import { CellsConverter } from "../../helpers/cells-converter";
import './BorderBox.scss';

export default class BorderBox extends React.Component<any, any, any>{
    cRef: React.RefObject<any>;

    constructor(props: any){
      super(props)
      this.cRef = React.createRef()
    }

    getVCells() {
        let vCells = this.props.vCells;

        const resizeToContent = this.props.resizeToContent;
        const minVCells = this.props.minVCells;

        if(resizeToContent && this.cRef?.current?.offsetHeight) {
            const fittedVCells = CellsConverter.heightToCells(this.cRef?.current?.offsetHeight);
            vCells = vCells > fittedVCells ? vCells : fittedVCells;
        } else if (minVCells) {
            vCells = vCells > minVCells ? vCells : minVCells;
        }

        return vCells;
    }

    getContentStyle(): CSSProperties {
        let props: CSSProperties = {};

        if(!this.props.resizeToContent && this.props.minVCells) {
            props.overflowX = 'auto';
            props.minHeight = `${CellsConverter.cellsToHeight(this.props.minVCells)}px`;
            props.height = `${CellsConverter.cellsToHeight(this.getVCells())}px`;
        }

        return props;
    }

    render() {
        const vCells = this.getVCells();
        const hCells = this.props.hCells;

        const borderVerticalLine = '+' + '-'.repeat(hCells) + '+';
        const borderHorizontalLine = '|'.repeat(vCells);

        return (
        <div className="t-border-box">        
            <div>{borderVerticalLine}</div>          

            <div className="content-flex">
                <div>{borderHorizontalLine}</div>

                <div style={this.getContentStyle()}><div ref={this.cRef}>{this.props.children}</div></div>

                <div>{borderHorizontalLine}</div>
            </div>
            
            <div>{borderVerticalLine}</div>
        </div>
        );
    }
}