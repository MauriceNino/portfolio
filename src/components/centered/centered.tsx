import React, { useEffect } from 'react';
import { CellsConverter } from '../../helpers/cells-converter';
import { CellProps } from '../../types/default-props';

type CenteredProps = {
  children: React.ReactNode;
  absolute?: boolean;
  horizontal?: boolean;
  vertical?: boolean;
} & CellProps;

const Centered = (props: CenteredProps) => {
  const childRef = React.useRef<HTMLElement>();
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  useEffect(() => {
    const child = childRef.current;

    if (child) {
      const { horizontal, vertical, absolute, vCells, hCells } = props;

      setTimeout(() => {
        if (horizontal) {
          const left = CellsConverter.cellsToWidth(
            Math.round(
              hCells / 2 - CellsConverter.widthToCells(child.offsetWidth / 2)
            )
          );

          if (absolute) {
            setStyle(style => ({
              ...style,
              left: `${left}px`,
              position: 'absolute'
            }));
          } else {
            setStyle(style => ({
              ...style,
              marginLeft: `${left}px`
            }));
          }
        }
        if (vertical) {
          const top = CellsConverter.cellsToHeight(
            Math.round(
              vCells / 2 - CellsConverter.heightToCells(child.offsetHeight / 2)
            )
          );
          if (absolute) {
            setStyle(style => ({
              ...style,
              top: `${top}px`,
              position: 'absolute'
            }));
          } else {
            setStyle(style => ({
              ...style,
              marginTop: `${top}px`
            }));
          }
        }
      }, 50);
    }
  }, [childRef, props]);

  return (
    <span ref={(el: HTMLElement) => (childRef.current = el)} style={style}>
      {props.children}
    </span>
  );
};

export default Centered;
