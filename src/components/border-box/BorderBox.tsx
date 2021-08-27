import React, { CSSProperties } from 'react';
import { CellsConverter } from '../../helpers/cells-converter';
import style from './BorderBox.module.scss';

export default class BorderBox extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);
  }

  getVCells() {
    let vCells = this.props.vCells;

    const minVCells = this.props.minVCells;

    if (minVCells) {
      vCells = vCells > minVCells ? vCells : minVCells;
    }

    return vCells;
  }

  getContentStyle(): CSSProperties {
    let props: CSSProperties = {};

    if (!this.props.resizeToContent && this.props.minVCells) {
      props.minHeight = `${CellsConverter.cellsToHeight(
        this.props.minVCells
      )}px`;
      props.height = `${CellsConverter.cellsToHeight(this.getVCells())}px`;
    }

    return props;
  }

  render() {
    const disableSideLines = this.props.disableSideLines;

    const vCells = this.getVCells();
    const hCells = this.props.hCells;

    const borderVerticalLine = '|'.repeat(vCells);
    const borderHorizontalLine = '+' + '-'.repeat(hCells - 2) + '+';

    return (
      <div className={style.tBorderBox}>
        <div>{borderHorizontalLine}</div>

        <div className={style.contentFlex}>
          {disableSideLines || (
            <div className={style.border}>{borderVerticalLine}</div>
          )}

          <div style={this.getContentStyle()} className={style.content}>
            {this.props.children}
          </div>

          {disableSideLines || (
            <div className={style.border}>{borderVerticalLine}</div>
          )}
        </div>

        <div>{borderHorizontalLine}</div>
      </div>
    );
  }
}
