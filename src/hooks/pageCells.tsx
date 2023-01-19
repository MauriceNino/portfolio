import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react';
import { CellProps } from '../types/default-props';
import { ContainerCellsProvider } from './containerCells';

const PageCellsContext = createContext<CellProps>({
  hCells: 50,
  vCells: 20
});

const getCurrentState = (): CellProps => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    hCells: Math.floor(width / 9.6),
    vCells: Math.floor(height / 21)
  };
};

export const PageCellsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<CellProps>({
    hCells: 50,
    vCells: 20
  });

  useEffect(() => {
    setState(getCurrentState());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newState = getCurrentState();

      if (
        state.hCells !== newState.hCells ||
        state.vCells !== newState.vCells
      ) {
        setState(newState);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [state]);

  return (
    <PageCellsContext.Provider value={state}>
      <ContainerCellsProvider value={state}>{children}</ContainerCellsProvider>
    </PageCellsContext.Provider>
  );
};

export const usePageCells = () => useContext(PageCellsContext);
