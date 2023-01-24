import { forwardRef, HTMLAttributes, PropsWithChildren, useMemo } from 'react';
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
}> &
  HTMLAttributes<HTMLDivElement>;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { dimensions, padding, widthUnset, heightUnset, showOutlines, ...props },
    ref
  ) => {
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

    const width = dimensions?.hCells ?? containerCells.hCells;
    const height = dimensions?.vCells ?? containerCells.vCells;

    const top = padding?.top ?? 0;
    const bottom = padding?.bottom ?? 0;
    const left = padding?.left ?? 0;
    const right = padding?.right ?? 0;

    return (
      <div
        ref={divRef}
        {...props}
        style={{
          paddingTop: `${CellsConverter.cellsToHeight(top)}px`,
          paddingBottom: `${CellsConverter.cellsToHeight(bottom)}px`,
          paddingLeft: `${CellsConverter.cellsToWidth(left)}px`,
          paddingRight: `${CellsConverter.cellsToWidth(right)}px`,
          width: widthUnset
            ? undefined
            : `${CellsConverter.cellsToWidth(width)}px`,
          height: heightUnset
            ? undefined
            : `${CellsConverter.cellsToHeight(height)}px`,
          outline: showOutlines ? '1px solid red' : undefined,
          ...props.style
        }}
      >
        <ContainerCellsProvider
          value={{
            hCells: widthUnset ? childDimensions.hCells : width - left - right,
            vCells: heightUnset ? childDimensions.vCells : height - top - bottom
          }}
        >
          {props.children}
        </ContainerCellsProvider>
      </div>
    );
  }
);
