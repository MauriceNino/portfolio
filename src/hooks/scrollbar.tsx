import {
  createContext,
  FC,
  PropsWithChildren,
  RefObject,
  useContext,
  useRef
} from 'react';
import SimpleBar from 'simplebar-react';

const ScrollbarContext = createContext<RefObject<SimpleBar> | null>(null);

export const ScrollbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const scrollbarRef = useRef<SimpleBar>(null);

  return (
    <SimpleBar
      ref={scrollbarRef}
      scrollableNodeProps={{ id: 'scrollable-content' }}
      style={{ maxHeight: '100%' }}
    >
      <ScrollbarContext.Provider value={scrollbarRef}>
        {children}
      </ScrollbarContext.Provider>
    </SimpleBar>
  );
};

export const useScrollbar = () => useContext(ScrollbarContext);
