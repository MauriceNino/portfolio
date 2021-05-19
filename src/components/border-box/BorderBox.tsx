import React from "react";
import './BorderBox.scss';

export default class BorderBox extends React.Component<any, any, any>{
    render() {
        const borderVerticalLine = '+' + '-'.repeat(this.props.vCells - 6) + '+';
        const borderHorizontalLine = '|'.repeat(this.props.hCells - 4);

        return (<>
            <div className="t-border-box">
                <div>{borderVerticalLine}</div>          

                <div className="content-flex">
                    <div>{borderHorizontalLine}</div>

                    <div>{this.props.children}</div>

                    <div>{borderHorizontalLine}</div>
                </div>
                
                <div>{borderVerticalLine}</div>
            </div>
        </>)  

    }
}