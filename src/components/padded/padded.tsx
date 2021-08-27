import { CellsConverter } from '../../helpers/cells-converter';

export default function Padded(props: any) {
  const top = props.top;
  const bottom = props.bottom;
  const left = props.left;
  const right = props.right;

  return (
    <div
      style={{
        paddingTop: `${CellsConverter.cellsToHeight(
          top === undefined ? 1 : top
        )}px`,
        paddingBottom: `${CellsConverter.cellsToHeight(
          bottom === undefined ? 1 : bottom
        )}px`,
        paddingLeft: `${CellsConverter.cellsToWidth(
          left === undefined ? 1 : left
        )}px`,
        paddingRight: `${CellsConverter.cellsToWidth(
          right === undefined ? 1 : right
        )}px`
      }}
    >
      {props.children}
    </div>
  );
}
