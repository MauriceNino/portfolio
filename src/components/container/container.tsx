import { forwardRef, PropsWithChildren, useMemo } from 'react';
import { CellsConverter } from '../../helpers/cells-converter';
import {
  ContainerCellsProvider,
  useContainerCells
} from '../../hooks/containerCells';
import { useForwardRef } from '../../hooks/forwardedRef';
import { CellProps } from '../../types/default-props';

type ContainerProps = PropsWithChildren<{
  dimensions?: Partial<CellProps>;
  padding?: Partial<{
    top: number;
    right: number;
    bottom: number;
    left: number;
  }>;
  widthUnset?: boolean;
  heightUnset?: boolean;
  showOutlines?: boolean;
}>;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const divRef = useForwardRef(ref);
    const containerCells = useContainerCells();

    const childDimensions = useMemo(() => {
      if (divRef.current && containerCells) {
        return {
          vCells: CellsConverter.heightToCells(divRef.current.offsetHeight),
          hCells: CellsConverter.widthToCells(divRef.current.offsetWidth)
        };
      } else {
        return {
          vCells: 0,
          hCells: 0
        };
      }
    }, [containerCells, divRef]);

    const width = props.dimensions?.hCells ?? containerCells.hCells;
    const height = props.dimensions?.vCells ?? containerCells.vCells;

    const top = props.padding?.top ?? 0;
    const bottom = props.padding?.bottom ?? 0;
    const left = props.padding?.left ?? 0;
    const right = props.padding?.right ?? 0;

    return (
      <div
        ref={divRef}
        style={{
          paddingTop: `${CellsConverter.cellsToHeight(top)}px`,
          paddingBottom: `${CellsConverter.cellsToHeight(bottom)}px`,
          paddingLeft: `${CellsConverter.cellsToWidth(left)}px`,
          paddingRight: `${CellsConverter.cellsToWidth(right)}px`,
          width: props.widthUnset
            ? undefined
            : `${CellsConverter.cellsToWidth(width)}px`,
          height: props.heightUnset
            ? undefined
            : `${CellsConverter.cellsToHeight(height)}px`,
          outline: props.showOutlines ? '1px solid red' : undefined
        }}
      >
        <ContainerCellsProvider
          value={{
            hCells: props.widthUnset
              ? childDimensions.hCells
              : width - left - right,
            vCells: props.heightUnset
              ? childDimensions.vCells
              : height - top - bottom
          }}
        >
          {props.children}
        </ContainerCellsProvider>
      </div>
    );
  }
);
