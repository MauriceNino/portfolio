export class CellsConverter {
  public static CELL_WIDTH = 9.6;
  public static CELL_HEIGHT = 21;

  public static cellsToWidth(w: number) {
    return w * CellsConverter.CELL_WIDTH;
  }

  public static cellsToHeight(h: number) {
    return h * CellsConverter.CELL_HEIGHT;
  }

  public static widthToCells(w: number) {
    return w / CellsConverter.CELL_WIDTH;
  }

  public static heightToCells(h: number) {
    return h / CellsConverter.CELL_HEIGHT;
  }

  public static roundToHeight(h: number) {
    return (
      Math.round(h / CellsConverter.CELL_HEIGHT) * CellsConverter.CELL_HEIGHT
    );
  }

  public static roundToWidth(w: number) {
    return (
      Math.round(w / CellsConverter.CELL_WIDTH) * CellsConverter.CELL_WIDTH
    );
  }
}
