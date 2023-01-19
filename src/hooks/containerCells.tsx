import { createContext, useContext } from 'react';
import { CellProps } from '../types/default-props';

const ContainerCellsContext = createContext<CellProps>({
  hCells: 0,
  vCells: 0
});

export const ContainerCellsProvider = ContainerCellsContext.Provider;
export const useContainerCells = () => useContext(ContainerCellsContext);
