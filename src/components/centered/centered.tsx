import React, { useEffect } from 'react';
import { CellsConverter } from '../../helpers/cells-converter';
import { CellProps } from '../../types/default-props';

type CenteredProps = {
  children: React.ReactElement;
  absolute?: boolean;
  horizontal?: boolean;
  vertical?: boolean;
} & CellProps;

const Centered = (props: CenteredProps) => {
  const childElement = React.Children.only(props.children);
  const childRef = React.useRef<HTMLElement>();
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  useEffect(() => {
    const child = childRef.current;

    if (child) {
      const { horizontal, vertical, absolute, vCells, hCells } = props;

      if (horizontal) {
        const left = CellsConverter.cellsToWidth(
          Math.round(
            hCells / 2 - CellsConverter.widthToCells(child.offsetWidth / 2)
          )
        );

        if (absolute) {
          setStyle(style => ({ ...style, left: `${left}px` }));
        } else {
          setStyle(style => ({ ...style, marginLeft: `${left}px` }));
        }
      }
      if (vertical) {
        const top = CellsConverter.cellsToHeight(
          Math.round(
            vCells / 2 - CellsConverter.heightToCells(child.offsetHeight / 2)
          )
        );
        if (absolute) {
          setStyle(style => ({ ...style, top: `${top}px` }));
        } else {
          setStyle(style => ({ ...style, marginTop: `${top}px` }));
        }
      }
    }
  }, [childRef, props]);

  return React.cloneElement(childElement, {
    ref: (el: HTMLElement) => (childRef.current = el),
    style: style
  });
};

export default Centered;
