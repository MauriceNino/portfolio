import {
  CSSProperties,
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState
} from 'react';
import { CellsConverter } from '../../helpers/cells-converter';
import { useContainerCells } from '../../hooks/containerCells';

type CenteredProps = PropsWithChildren<{
  absolute?: boolean;
  horizontal?: boolean;
  vertical?: boolean;
}>;

export const Centered: FC<CenteredProps> = props => {
  const { vCells, hCells } = useContainerCells();
  const childRef = useRef<HTMLElement>();
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const child = childRef.current;

    if (child) {
      const { horizontal, vertical, absolute } = props;

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
  }, [childRef, hCells, props, vCells]);

  return (
    <span ref={(el: HTMLElement) => (childRef.current = el)} style={style}>
      {props.children}
    </span>
  );
};
