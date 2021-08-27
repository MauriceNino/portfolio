import { CSSProperties } from 'react';
import { CellsConverter } from './cells-converter';

export class TextHelper {
  private static partitionArray<T>(arr: T[], on: (el: T) => boolean): T[][] {
    return arr
      .reduce(
        (acc, curr) => {
          if (on(curr)) {
            acc.push([]);
          } else {
            acc[acc.length - 1].push(curr);
          }

          return acc;
        },
        [[]] as T[][]
      )
      .filter(arr => arr.length !== 0);
  }

  private static getLineLength(el: JSX.Element): number {
    const children: (JSX.Element | string)[] = el?.props?.children;

    if (!children) return 0;

    if (typeof children === 'string') {
      return (children as string).length;
    } else {
      return TextHelper.partitionArray(
        children as JSX.Element[],
        e => e.type === 'br'
      )
        .map(el =>
          el.reduce((acc: number, curr: JSX.Element | string) => {
            if (typeof curr === 'string') {
              acc += curr.length;
            } else {
              acc += TextHelper.getLineLength(curr);
            }

            return acc;
          }, 0)
        )
        .reduce((a, b) => (a > b ? a : b), 0);
    }
  }

  private static getLineHeight(el: JSX.Element): number {
    return (
      (el.props.children || []).filter((c: JSX.Element) => c.type === 'br')
        .length + 1
    );
  }

  public static centered(
    elements: JSX.Element[],
    parentVCells: number,
    parentHCells: number
  ): JSX.Element[] {
    const allElementsHeight = elements
      .map(el => TextHelper.getLineHeight(el))
      .reduce((a, b) => a + b, 0);
    let reachedHeight = 0;

    return elements.map((el, i) => {
      const elLength = TextHelper.getLineLength(el);
      const elHeight = TextHelper.getLineHeight(el);

      const distanceLeft = CellsConverter.cellsToWidth(
        Math.floor(parentHCells / 2 - elLength / 2)
      );
      const distanceTop = CellsConverter.cellsToHeight(
        Math.floor(parentVCells / 2 - allElementsHeight / 2 + reachedHeight)
      );

      reachedHeight += elHeight;

      const style: CSSProperties = {
        position: 'absolute',
        left: `${distanceLeft}px`,
        top: `${distanceTop}px`,
        whiteSpace: 'nowrap'
      };

      return (
        <div style={style} key={i}>
          {el}
        </div>
      );
    });
  }
}
