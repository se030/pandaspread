import { MutableRefObject, createContext } from 'react';

interface ColumnContextValue {
  columnRefs: MutableRefObject<HTMLTableCellElement[]>;
}

const ColumnContext = createContext<ColumnContextValue | null>(null);

export { ColumnContext };
